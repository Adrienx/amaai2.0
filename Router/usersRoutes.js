const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.get("/", usersController.index)
router.post("/", usersController.create)
router.get("/:id", usersController.show)
router.put("/:id", usersController.update)
router.delete("/:id", usersController.delete)

module.exports = router
