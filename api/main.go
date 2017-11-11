/**
 * Created by VoidArtanis on 10/22/2017
 */

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/routes"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/shared"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/models"
)

var DB = make(map[string]string)

func main() {

	//Db Connect and Close
	shared.DbInit()
	models.MigrateModels()
	defer shared.CloseDb()

	//Init Gin
	r := gin.Default()
	routes.InitRouter(r)

	//Run Server
	r.Run(":8080")
}