package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Email        *string   `gorm:"uniqueIndex" json:"email,omitempty"`
	Phone        *string   `gorm:"uniqueIndex" json:"phone,omitempty"`
	AuthProvider string    `gorm:"type:varchar(20);notNull" json:"auth_provider"`
	ProviderID   string    `gorm:"type:varchar(255)" json:"provider_id"`
	Name         string    `gorm:"type:varchar(255)" json:"name"`
	AvatarURL    string    `gorm:"type:varchar(500)" json:"avatar_url"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Onboarded    bool      `gorm:"default:false" json:"onboarded"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

type Session struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserID     uuid.UUID `gorm:"type:uuid;notNull;index" json:"user_id"`
	TokenHash  string    `gorm:"type:varchar(255);notNull" json:"token_hash"`
	DeviceInfo string    `gorm:"type:jsonb" json:"device_info"`
	ExpiresAt  time.Time `gorm:"notNull" json:"expires_at"`
	Revoked    bool      `gorm:"default:false" json:"revoked"`
	CreatedAt  time.Time `json:"created_at"`
}

func (s *Session) BeforeCreate(tx *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

type UserAPIKey struct {
	ID            uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserID        uuid.UUID `gorm:"type:uuid;notNull;index" json:"user_id"`
	Provider      string    `gorm:"type:varchar(20);notNull" json:"provider"`
	EncryptedKey  []byte    `gorm:"type:bytea;notNull" json:"encrypted_key"`
	KeyHint       string    `gorm:"type:varchar(10)" json:"key_hint"`
	ModelOverride string    `gorm:"type:varchar(50)" json:"model_override"`
	IsActive      bool      `gorm:"default:false" json:"is_active"`
	CreatedAt     time.Time `json:"created_at"`
}

func (k *UserAPIKey) BeforeCreate(tx *gorm.DB) error {
	if k.ID == uuid.Nil {
		k.ID = uuid.New()
	}
	return nil
}

type JobApplication struct {
	ID              uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	UserID          uuid.UUID  `gorm:"type:uuid;notNull;index" json:"user_id"`
	JobListingID    string     `gorm:"type:varchar(255)" json:"job_listing_id"`
	Status          string     `gorm:"type:varchar(20);notNull" json:"status"`
	ConfidenceScore float64    `json:"confidence_score"`
	AppliedAt       *time.Time `json:"applied_at"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
}

func (j *JobApplication) BeforeCreate(tx *gorm.DB) error {
	if j.ID == uuid.Nil {
		j.ID = uuid.New()
	}
	return nil
}
