package handlers

import (
	"github.com/gin-gonic/gin"
)

type ProfileHandler struct{}

func NewProfileHandler() *ProfileHandler {
	return &ProfileHandler{}
}

func (h *ProfileHandler) Get(c *gin.Context) {
	c.JSON(200, gin.H{
		"id":               "uuid",
		"target_role":      "",
		"target_countries": []string{},
		"experience_years": 0,
		"work_history":     []interface{}{},
		"skills":           []interface{}{},
		"education":        []interface{}{},
	})
}

func (h *ProfileHandler) Update(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Profile updated"})
}

func (h *ProfileHandler) Enrich(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Profile enrichment started"})
}
