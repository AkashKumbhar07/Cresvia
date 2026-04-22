package main

import (
	"log"
	"os"

	"cresvia-backend/internal/config"
	"cresvia-backend/internal/db"
	"cresvia-backend/internal/handlers"
	"cresvia-backend/internal/middleware"
	"cresvia-backend/pkg/logger"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()

	logger.Init(cfg.LogLevel)

	if err := db.Connect(cfg); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	r := gin.Default()

	r.Use(middleware.CORS())
	r.Use(middleware.RequestLogger())

	api := r.Group("/api/v1")
	{
		authHandler := handlers.NewAuthHandler(cfg)
		api.POST("/auth/google", authHandler.GoogleLogin)
		api.POST("/auth/email/send", authHandler.SendMagicLink)
		api.POST("/auth/email/verify", authHandler.VerifyMagicLink)
		api.POST("/auth/phone/send", authHandler.SendOTP)
		api.POST("/auth/phone/verify", authHandler.VerifyOTP)
		api.POST("/auth/refresh", authHandler.RefreshToken)
		api.DELETE("/auth/session", authHandler.Logout)

		protected := api.Group("")
		protected.Use(middleware.AuthRequired(cfg))
		{
			profileHandler := handlers.NewProfileHandler()
			protected.GET("/profile", profileHandler.Get)
			protected.PUT("/profile", profileHandler.Update)
			protected.POST("/profile/enrich", profileHandler.Enrich)

			resumeHandler := handlers.NewResumeHandler()
			protected.GET("/resume", resumeHandler.List)
			protected.POST("/resume/generate", resumeHandler.Generate)
			protected.GET("/resume/:id", resumeHandler.Get)
			protected.PUT("/resume/:id", resumeHandler.Update)
			protected.GET("/resume/:id/pdf", resumeHandler.DownloadPDF)

			jobHandler := handlers.NewJobHandler()
			protected.GET("/jobs", jobHandler.List)
			protected.GET("/jobs/:id", jobHandler.Get)
			protected.GET("/jobs/:id/confidence", jobHandler.GetConfidence)
			protected.POST("/jobs/:id/save", jobHandler.Save)

			salaryHandler := handlers.NewSalaryHandler()
			protected.GET("/salary", salaryHandler.Get)

			prepHandler := handlers.NewPrepHandler()
			protected.POST("/prep", prepHandler.Generate)
			protected.GET("/prep/:id", prepHandler.Get)
			protected.PATCH("/prep/:id/progress", prepHandler.UpdateProgress)

			settingsHandler := handlers.NewSettingsHandler(cfg)
			protected.GET("/settings/keys", settingsHandler.ListKeys)
			protected.POST("/settings/keys", settingsHandler.AddKey)
			protected.DELETE("/settings/keys/:id", settingsHandler.RemoveKey)
			protected.POST("/settings/keys/:id/activate", settingsHandler.ActivateKey)
			protected.POST("/settings/keys/test", settingsHandler.TestKey)
		}
	}

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
