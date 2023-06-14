const mongoose = require("mongoose")

const PromptCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prompt" }],
})

module.exports = mongoose.model("PromptCategory", PromptCategorySchema)
