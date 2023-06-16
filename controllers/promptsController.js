const { Prompt, User, PromptCategory } = require("../models")

exports.index = (req, res) => {
  Prompt.find().then((prompts) => res.json(prompts))
}

exports.create = async (req, res) => {
  const { title, description, category, user } = req.body

  try {
    // Create a new prompt
    const newPrompt = new Prompt({
      title,
      description,
      category,
      user,
    })
    await newPrompt.save()

    // Add the new prompt's ID to the user's and category's 'prompts' array
    await User.findByIdAndUpdate(user, { $push: { prompts: newPrompt._id } })
    await PromptCategory.findByIdAndUpdate(category, {
      $push: { prompts: newPrompt._id },
    })

    res.status(201).json(newPrompt)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
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

exports.delete = async (req, res) => {
  try {
    const promptId = req.params.id
    // Find prompt document by ID and remove
    await Prompt.findByIdAndRemove(promptId)

    // Update user and category documents to remove reference to deleted prompt
    const user = await User.findOne({ prompts: { $in: [promptId] } })
    const category = await PromptCategory.findOne({
      prompts: { $in: [promptId] },
    })

    // Pull the prompt ID from the user and category prompts arrays
    if (user) {
      user.prompts.pull(promptId)
      await user.save()
    }
    if (category) {
      category.prompts.pull(promptId)
      await category.save()
    }

    res.json({ message: "Prompt successfully deleted." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findByCategory = async (req, res) => {
  try {
    const prompts = await Prompt.find({
      category: req.params.categoryId,
    }).populate("category")
    res.json(prompts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
