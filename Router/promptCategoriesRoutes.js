const express = require("express")
const router = express.Router()
const promptCategoriesController = require("../controllers/promptCategoriesController")

router.get("/", promptCategoriesController.index)
router.post("/", promptCategoriesController.create)
router.get("/:id", promptCategoriesController.show)
router.put("/:id", promptCategoriesController.update)
router.delete("/:id", promptCategoriesController.delete)

module.exports = router
