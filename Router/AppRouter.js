const express = require("express")
const router = express.Router()
const { User } = require("../models")

const userRouter = require("./usersRoutes")
const promptRouter = require("./promptRoutes")
const promptCategoriesRoutes = require("./promptCategoriesRoutes")

router.use("/users", userRouter)
router.use("/promptRouter", promptRouter)
router.use("/promptCategory", promptCategoriesRoutes)

module.exports = router
