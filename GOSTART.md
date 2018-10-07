# Start working with Golang API

## Basic knowledge & syntax: Go Tour

Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that get the most out of multicore and networked machines, while its novel type system enables flexible and modular program construction. Go compiles quickly to machine code yet has the convenience of garbage collection and the power of run-time reflection. It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language.

> Download Go: https://golang.org/dl/

Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that get the most out of multicore and networked machines, while its novel type system enables flexible and modular program construction. Go compiles quickly to machine code yet has the convenience of garbage collection and the power of run-time reflection. It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language.

> Start with Go Tour: https://tour.golang.org/welcome/

## Concurrency & Parallelism, Goroutines & Channels in Golang

> Concurrency is a property of a program where two or more tasks can be in progress simultaneously. Parallelism is a run-time property where two or more tasks are being executed simultaneously. Through concurrency you want to define a proper structure to your program. Concurrency can use parallelism for getting its job done but remember parallelism is not the ultimate goal of concurrency.

Read more & Understand: https://medium.com/@tilaklodha/concurrency-and-parallelism-in-golang-5333e9a4ba64

## Build a Simple CRUD Go API with Go Gin Framework

Gin is a HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance -- up to 40 times faster.

To understand more, let's build a simple Go Gin based:

> Go Gin simple Rest API with MySQL https://github.com/huynhminhtufu/GoGinAPI/

This project uses Go Gin & [go-sql-driver](https://github.com/go-sql-driver/mysql) to connect with MySQL Server.

**File structure**:

- __controllers__
    - stories.go (query in MySQL & Response)
- __database__
    - connect.go (mySQL connect configuration)
- __main.go__ (server & route Gin based)

## Build a Go API based on Gorilla Mux & GORM

> Github: https://github.com/huynhminhtufu/GoAPI

Library used:

* Router: mux
* Middlewares: negroni
* ORM: gorm
* Logger: logrus


**File structure** (MVC based):

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