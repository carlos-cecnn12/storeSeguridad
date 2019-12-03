const express = require("express")
const router = express.Router()
const storeController = require("../controllers/store")

router.post("/newUser", storeController.newUser)
router.post("/loginUser", storeController.loginUser)
router.post("/:username/addCart",storeController.addCart)
router.get("/",storeController.getIndex)
router.get("/signup",storeController.registerPage)
router.get("/login",storeController.loginPage)
router.get("/passwordRecovery",storeController.passwordRecovery)
router.post("/passwordRecover",storeController.passwordRecover)
router.post("/setPassword",storeController.setPassword)
router.get("/:username/store",storeController.storePage)
router.get("/:username/cartPage",storeController.cartPage)
router.post("/:username/contactSocket",storeController.socketPage)


module.exports= router;
