package app

import (
	"net/http"

	"github.com/gorilla/mux"
	"./controllers"

	"./lib"
)

func notFound(w http.ResponseWriter, r *http.Request) {
	res := lib.Response{ResponseWriter: w}
	res.SendOK("Go server is running, this is default page, also a notfound page.")
}

// NewRouter ...
func NewRouter() *mux.Router {

	// Create main router
	mainRouter := mux.NewRouter().StrictSlash(true)
	mainRouter.KeepContext = true

	// Handle 404
	mainRouter.NotFoundHandler = http.HandlerFunc(notFound)

	/**
	 * meta-data
	 */
	mainRouter.Methods("GET").Path("/api/info").HandlerFunc(controllers.GetAPIInfo)
	

	/**
	 * /users
	 */
	// usersRouter.HandleFunc("/", l.Use(c.GetAllUsersHandler, m.SaySomething())).Methods("GET")

	// User routes
	mainRouter.Methods("GET").Path("/api/users").HandlerFunc(controllers.GetAllUsersHandler)
	mainRouter.Methods("POST").Path("/api/users").HandlerFunc(controllers.CreateUserHandler)
	mainRouter.Methods("GET").Path("/api/users/{id}").HandlerFunc(controllers.GetUserByIDHandler)
	mainRouter.Methods("PUT").Path("/api/users/{id}").HandlerFunc(controllers.UpdateUserHandler)
	mainRouter.Methods("DELETE").Path("/api/users/{id}").HandlerFunc(controllers.DeleteUserHandler)

	// Comment routes
	mainRouter.Methods("POST").Path("/api/comments").HandlerFunc(controllers.CreateCommentHandler)
	mainRouter.Methods("GET").Path("/api/comments/{domain}/{path}").HandlerFunc(controllers.GetCommentByBlogHandler)
	mainRouter.Methods("DELETE").Path("/api/comments/{id}").HandlerFunc(controllers.DeleteUserHandler)

	return mainRouter
}
