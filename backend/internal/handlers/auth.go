package handlers

import (
	"cresvia-backend/internal/config"
	"cresvia-backend/internal/services"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type AuthRequest struct {
	Email string `json:"email,omitempty"`
	Phone string `json:"phone,omitempty"`
	Code  string `json:"code,omitempty"`
}

func (h *AuthHandler) GoogleLogin(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Google OAuth not configured"})
}

func (h *AuthHandler) SendMagicLink(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}
	c.JSON(200, gin.H{"message": "Magic link sent"})
}

func (h *AuthHandler) VerifyMagicLink(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}
	c.JSON(200, gin.H{"message": "Login successful"})
}

func (h *AuthHandler) SendOTP(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}
	c.JSON(200, gin.H{"message": "OTP sent"})
}

func (h *AuthHandler) VerifyOTP(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	token, _ := services.GenerateJWT(
		services.StringToUUID("00000000-0000-0000-0000-000000000001"),
		services.StringToUUID("00000000-0000-0000-0000-000000000001"),
		h.cfg.JWT_secret,
		h.cfg.AccessTTL,
	)

	c.JSON(200, gin.H{"access_token": token})
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	c.JSON(200, gin.H{"access_token": "new_token"})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Logged out"})
}
