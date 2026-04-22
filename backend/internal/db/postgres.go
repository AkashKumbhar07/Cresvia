package db

import (
	"fmt"
	"log"
	"os"
	"time"

	"cresvia-backend/internal/config"
	"cresvia-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect(cfg *config.Config) error {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)

	logLogger := logger.New(
		log.New(os.Stdout, "[INFO] ", log.Ldate|log.Ltime),
		logger.Config{
			SlowThreshold:             time.Second,
			LogLevel:                  logger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logLogger,
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return fmt.Errorf("failed to get database connection: %w", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	DB = db

	if err := autoMigrate(db); err != nil {
		return fmt.Errorf("failed to migrate: %w", err)
	}

	return nil
}

func autoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Session{},
		&models.UserAPIKey{},
		&models.JobApplication{},
	)
}

func Close() error {
	if sqlDB, err := DB.DB(); err == nil {
		return sqlDB.Close()
	}
	return nil
}
