# Boilerplate for REST API in Golang

Create Comment micro function for Jekyll blog.

## Get started

### Operations

| Operation | Command      | Description |
| --------- | ------------ | ----------- |
| **run**   | `go run *`   | Runs the app |
| **build** | `go build *` | Builds the app. |

## Librarys

- **Router** [mux](http://www.gorillatoolkit.org/pkg/mux)
- **Middlewares** [negroni](https://github.com/urfave/negroni)
- **ORM** [gorm](http://jinzhu.me/gorm/)
- **Logger** [logrus](https://github.com/sirupsen/logrus)

## Preview

![Preview](http://imageshack.com/a/img922/7466/FNQlzw.png "Preview")

## File Structure (MVC Based)

- __config__
    - Database.go (database config with GORM)
- __controllers__
    - ApisController.go (get API info and some common...)
    - CommentsController.go (manage comment req/res)
    - UsersController.go (manage user req/res)
- __lib__ (common use)
    - Based.go (based model with id, time)
    - Middleware.go (prepare for middleware)
    - Request.go (api request common func)
    - Response.go (api response common func)
- __middlewares__
    - Auth0Middleware.go
    - CORSMiddleware.go
    - JWTMiddleware.go
    - LogMiddleware.go
    - SecureMiddleware.go
    - SampleMiddleware.go
- __model__
    - Comment.go (comment method, CRUD...)
    - User.go
- __server.go__ (init server with middlewares flow)
- __router.go__ (routing with controllers)
- __main.go__ (run server & migrate databases)