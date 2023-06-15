const express = require("express")
const router = express.Router()
const promptsController = require("../controllers/promptsController")

router.get("/", promptsController.index)
router.post("/", promptsController.create)
router.get("/:id", promptsController.show)
router.put("/:id", promptsController.update)
router.delete("/:id", promptsController.delete)
router.get("/category/:categoryId", promptsController.findByCategory)

module.exports = router
