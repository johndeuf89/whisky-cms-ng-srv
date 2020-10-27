const express = require("express")

const router = express.Router() // Création d"un router

// Le router ne reagira que si on fait une requète /ping
router.get("/ping", (req, res) => {
	res.status(200).json({ msg: "pong", date: new Date() })
})//localhost:3000/ping

module.exports = router

