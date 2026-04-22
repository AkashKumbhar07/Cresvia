package config

import (
	"os"
	"strconv"
	"time"
)

type Config struct {
	DBHost     string
	DBPort     int
	DBUser     string
	DBPassword string
	DBName     string

	RedisHost string
	RedisPort int

	MongoURI string
	MongoDB  string

	JWT_secret string
	AccessTTL  time.Duration
	RefreshTTL time.Duration

	GoogleClientID     string
	GoogleClientSecret string

	SMTPHost string
	SMTPPort int
	SMTPUser string
	SMTPPass string

	ResendAPIKey string

	TwilioSID   string
	TwilioToken string
	TwilioPhone string

	EncryptionKey []byte

	PdfServiceURL string

	S3Bucket    string
	S3Region    string
	S3AccessKey string
	S3SecretKey string

	FrontendURL string
	LogLevel    string
}

func Load() *Config {
	return &Config{
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnvInt("DB_PORT", 5432),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "postgres"),
		DBName:     getEnv("DB_NAME", "cresvia"),

		RedisHost: getEnv("REDIS_HOST", "localhost"),
		RedisPort: getEnvInt("REDIS_PORT", 6379),

		MongoURI: getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoDB:  getEnv("MONGO_DB", "cresvia"),

		JWT_secret: getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
		AccessTTL:  getEnvDuration("ACCESS_TTL", 15*time.Minute),
		RefreshTTL: getEnvDuration("REFRESH_TTL", 30*24*time.Hour),

		GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
		GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),

		SMTPHost: getEnv("SMTP_HOST", "smtp.gmail.com"),
		SMTPPort: getEnvInt("SMTP_PORT", 587),
		SMTPUser: getEnv("SMTP_USER", ""),
		SMTPPass: getEnv("SMTP_PASS", ""),

		ResendAPIKey: getEnv("RESEND_API_KEY", ""),

		TwilioSID:   getEnv("TWILIO_SID", ""),
		TwilioToken: getEnv("TWILIO_TOKEN", ""),
		TwilioPhone: getEnv("TWILIO_PHONE", ""),

		EncryptionKey: []byte(getEnv("ENCRYPTION_KEY", "32-byte-key-for-aes-256-gcm!!")),

		PdfServiceURL: getEnv("PDF_SERVICE_URL", "http://localhost:3001"),

		S3Bucket:    getEnv("S3_BUCKET", ""),
		S3Region:    getEnv("S3_REGION", "us-east-1"),
		S3AccessKey: getEnv("S3_ACCESS_KEY", ""),
		S3SecretKey: getEnv("S3_SECRET_KEY", ""),

		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
		LogLevel:    getEnv("LOG_LEVEL", "info"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intVal, err := strconv.Atoi(value); err == nil {
			return intVal
		}
	}
	return defaultValue
}

func getEnvDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		if d, err := time.ParseDuration(value); err == nil {
			return d
		}
	}
	return defaultValue
}
