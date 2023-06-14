const { PromptCategory } = require("../models")

exports.index = (req, res) => {
  PromptCategory.find().then((promptCategories) => res.json(promptCategories))
}

exports.create = (req, res) => {
  PromptCategory.create(req.body).then((promptCategory) =>
    res.json(promptCategory)
  )
}

exports.show = (req, res) => {
  PromptCategory.findById(req.params.id).then((promptCategory) =>
    res.json(promptCategory)
  )
}

exports.update = (req, res) => {
  PromptCategory.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (promptCategory) => res.json(promptCategory)
  )
}

exports.delete = (req, res) => {
  PromptCategory.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: "Prompt Category deleted" })
  )
}
