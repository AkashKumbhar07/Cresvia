package handlers

import (
	"github.com/gin-gonic/gin"
)

type SalaryHandler struct{}

func NewSalaryHandler() *SalaryHandler {
	return &SalaryHandler{}
}

func (h *SalaryHandler) Get(c *gin.Context) {
	c.JSON(200, gin.H{
		"min":      0,
		"median":   0,
		"max":      0,
		"currency": "USD",
	})
}
