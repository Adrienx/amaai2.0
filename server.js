const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
const PORT = process.env.PORT || 3001
const AppRouter = require("./Router/AppRouter.js")
const Prompt = require("./models/Prompt")
const PromptCategory = require("./models/PromptCategory")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("landing page")
})

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))

app.use("/api", AppRouter)

//In the delete operation, ensure that all error messages are logged or sent to the client
app.delete("/api/promptCategories/:id", async (req, res) => {
  try {
    const category = await PromptCategory.findOne({ _id: req.params.id })

    await Promise.all([
      Prompt.deleteMany({ _id: { $in: category.prompts } }),
      PromptCategory.deleteOne({ _id: req.params.id }),
    ])

    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.toString() }) // Send the error to client
  }
})
