const { User, Prompt, PromptCategory } = require("../models")


exports.index = async (req, res) => {
  try {
    const promptCategories = await PromptCategory.find().populate("prompts")
    res.json(promptCategories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.create = (req, res) => {
  PromptCategory.create(req.body).then((promptCategory) =>
    res.json(promptCategory)
  )
}

exports.show = async (req, res) => {
  try {
    const promptCategory = await PromptCategory.findById(
      req.params.id
    ).populate("prompts")
    res.json(promptCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.update = (req, res) => {
  PromptCategory.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (promptCategory) => res.json(promptCategory)
  )
}

exports.delete = async (req, res) => {
  try {
    const category = await PromptCategory.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Remove all the associated prompts
    for (let promptId of category.prompts) {
      const prompt = await Prompt.findById(promptId)

      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" })
      }

      // Remove this prompt from the user's prompts array.
      const user = await User.findById(prompt.user)

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      user.prompts.pull(prompt._id)
      await user.save()

      // Delete the prompt itself.
      await Prompt.deleteOne({ _id: prompt._id })
    }

    // Delete the category itself
    await PromptCategory.deleteOne({ _id: req.params.id })

    res.json({ message: "Category and its associated prompts deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}



