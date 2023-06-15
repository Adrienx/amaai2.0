const express = require("express")
const router = express.Router()
const { User } = require("../models")

const userRouter = require("./usersRoutes")
const promptRouter = require("./promptRoutes")
const promptCategoriesRoutes = require("./promptCategoriesRoutes")

router.use("/users", userRouter)
router.use("/prompts", promptRouter)
router.use("/promptCategories", promptCategoriesRoutes)

module.exports = router
