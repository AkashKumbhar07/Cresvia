package handlers

import (
	"cresvia-backend/internal/config"

	"github.com/gin-gonic/gin"
)

type SettingsHandler struct {
	cfg *config.Config
}

func NewSettingsHandler(cfg *config.Config) *SettingsHandler {
	return &SettingsHandler{cfg: cfg}
}

func (h *SettingsHandler) ListKeys(c *gin.Context) {
	c.JSON(200, gin.H{"keys": []interface{}{}})
}

func (h *SettingsHandler) AddKey(c *gin.Context) {
	c.JSON(200, gin.H{"message": "API key added"})
}

func (h *SettingsHandler) RemoveKey(c *gin.Context) {
	c.JSON(200, gin.H{"message": "API key removed"})
}

func (h *SettingsHandler) ActivateKey(c *gin.Context) {
	c.JSON(200, gin.H{"message": "API key activated"})
}

func (h *SettingsHandler) TestKey(c *gin.Context) {
	c.JSON(200, gin.H{"valid": true})
}
