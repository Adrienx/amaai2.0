const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
const PORT = process.env.PORT || 3001
const AppRouter = require("./Router/AppRouter.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("landing page")
})

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))

app.use("/api", AppRouter)
