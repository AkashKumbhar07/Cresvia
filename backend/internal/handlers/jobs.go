package handlers

import (
	"github.com/gin-gonic/gin"
)

type JobHandler struct{}

func NewJobHandler() *JobHandler {
	return &JobHandler{}
}

func (h *JobHandler) List(c *gin.Context) {
	c.JSON(200, gin.H{"jobs": []interface{}{}, "total": 0})
}

func (h *JobHandler) Get(c *gin.Context) {
	c.JSON(200, gin.H{"id": c.Param("id")})
}

func (h *JobHandler) GetConfidence(c *gin.Context) {
	c.JSON(200, gin.H{"confidence": 0.0})
}

func (h *JobHandler) Save(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Job saved"})
}
