const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  prompts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prompt" }],
})

module.exports = mongoose.model("User", UserSchema)
