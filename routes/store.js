const express = require("express")
const router = express.Router()
const storeController = require("../controllers/store")

router.post("/newUser", storeController.newUser)

module.exports= router;
