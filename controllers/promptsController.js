const { Prompt } = require("../models")

exports.index = (req, res) => {
  Prompt.find().then((prompts) => res.json(prompts))
}

exports.create = (req, res) => {
  Prompt.create(req.body).then((prompt) => res.json(prompt))
}

exports.show = (req, res) => {
  Prompt.findById(req.params.id).then((prompt) => res.json(prompt))
}

exports.update = (req, res) => {
  Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    // { new: true } will return the updated document
    (prompt) => res.json(prompt)
  )
}

exports.delete = (req, res) => {
  Prompt.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: "Prompt deleted" })
  )
}
