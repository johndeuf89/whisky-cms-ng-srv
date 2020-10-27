const express = require("express")
const app = express()
const api = require("./api/v1/index") // permet d'importer router
const cors = require("cors")

app.set("port", (process.env.port || 3000 ))

//Utilisation de cors middleware pour la gestion des requetes
app.use(cors()) //app.use permet d'utiliser des middleware
app.use("/api/v1", api) //requete sur localhost:3000/api/v1

// On écoute sur le port défini précedement 
app.listen(app.get("port"), () => {
	console.log(`express server listening on port ${app.get("port")}`)
}) 
