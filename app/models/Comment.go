package models

import (
	"errors"
	"time"

	"../config"
)

// Comment ...
type Comment struct {
	ID        int        `json:"id" gorm:"primary_key"`
	CreatedAt *time.Time `json:"createdAt, omitempty"`
	UpdatedAt *time.Time `json:"updatedAt, omitempty"`
	DeletedAt *time.Time `json:"deletedAt, omitempty" sql:"index"`

	Domain 		string `json:"domain, omitempty" gorm:"not null; type:varchar(100)"`
	Path 			string `json:"path, omitempty" gorm:"not null; type:varchar(100)"`
	Content  	string `json:"content, omitempty" gorm:"not null; type:text"`
	Email     string `json:"email, omitempty" gorm:"not null; type:varchar(100)"`
	Name     	string `json:"name, omitempty" gorm:"not null; type:varchar(100)"`
}

// TableName ...
func (Comment) TableName() string {
	return "comments"
}

// FetchByPath ...
func (c *Comment) FetchByPath() []Comment {
	db := config.GetDatabaseConnection()

	var comments []Comment
	db.Where("domain = ?", c.Domain).Where("path = ?", c.Path).Find(&comments)

	return comments
}

// Create ...
func (c *Comment) Create() error {
	db := config.GetDatabaseConnection()

	// Validation fields not null
	if (c.Domain == "" || c.Path == "" || c.Content == "" || c.Email == "" || c.Name == "") {
		return errors.New("Error in field validation")
	}

	if !db.NewRecord(c) {
		return errors.New("New records can not have primary key id")
	}

	if err := db.Create(&c).Error; err != nil {
		return errors.New("Could not create comment")
	}

	return nil
}

// Delete ...
func (c *Comment) Delete() error {
	db := config.GetDatabaseConnection()

	if err := db.Delete(&c).Error; err != nil {
		return errors.New("Could not find the comment")
	}

	return nil
}