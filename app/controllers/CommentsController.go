package controllers

import (
	"net/http"

	"../lib"
	"../models"
)

// CreateCommentHandler ...
func CreateCommentHandler(w http.ResponseWriter, r *http.Request) {
	req := lib.Request{ResponseWriter: w, Request: r}
	res := lib.Response{ResponseWriter: w}

	comment := new(models.Comment)
	req.GetJSONBody(comment)

	if err := comment.Create(); err != nil {
		res.SendBadRequest(err.Error())
		return
	}

	res.SendCreated(comment)
}

// GetCommentByBlogHandler ...
func GetCommentByBlogHandler(w http.ResponseWriter, r *http.Request) {
	req := lib.Request{ResponseWriter: w, Request: r}
	res := lib.Response{ResponseWriter: w}

	domain, path, _ := req.GetCommentPath()
	comment := models.Comment{
		Domain: domain,
		Path: path,
	}

	var comments []models.Comment
	comments = comment.FetchByPath()

	res.SendOK(comments)
}

// DeleteCommentHandler ...
func DeleteCommentHandler(w http.ResponseWriter, r *http.Request) {
	req := lib.Request{ResponseWriter: w, Request: r}
	res := lib.Response{ResponseWriter: w}

	id, _ := req.GetVarID()
	comment := models.Comment{
		ID: id,
	}

	if err := comment.Delete(); err != nil {
		res.SendNotFound()
		return
	}

	res.SendNoContent()
}