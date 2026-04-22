package handlers

import (
	"github.com/gin-gonic/gin"
)

type PrepHandler struct{}

func NewPrepHandler() *PrepHandler {
	return &PrepHandler{}
}

func (h *PrepHandler) Generate(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Prep plan generation started"})
}

func (h *PrepHandler) Get(c *gin.Context) {
	c.JSON(200, gin.H{"id": c.Param("id")})
}

func (h *PrepHandler) UpdateProgress(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Progress updated"})
}
