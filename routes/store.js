const express = require("express")
const router = express.Router()
const storeController = require("../controllers/store")

router.post("/newUser", storeController.newUser)
router.post("/loginUser", storeController.loginUser)
router.get("/",storeController.getIndex)
router.get("/signup",storeController.registerPage)
router.get("/login",storeController.loginPage)

module.exports= router;
