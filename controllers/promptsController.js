const { Prompt, User, PromptCategory } = require("../models");

exports.index = (req, res) => {
  Prompt.find().then((prompts) => res.json(prompts));
};

exports.create = async (req, res) => {
  const { title, description, category, user } = req.body;

  try {
    // Create a new prompt
    const newPrompt = new Prompt({
      title,
      description,
      category,
      user,
    });
    await newPrompt.save();

    // Add the new prompt's ID to the user's and category's 'prompts' array
    await User.findByIdAndUpdate(user, { $push: { prompts: newPrompt._id } });
    await PromptCategory.findByIdAndUpdate(category, { $push: { prompts: newPrompt._id } });

    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.show = (req, res) => {
  Prompt.findById(req.params.id).then((prompt) => res.json(prompt));
};

exports.update = (req, res) => {
  Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    // { new: true } will return the updated document
    (prompt) => res.json(prompt)
  );
};

exports.delete = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    // Remove the prompt id from the user's prompts array
    await User.findByIdAndUpdate(prompt.user, { $pull: { prompts: prompt._id } });
    
    // Remove the prompt id from the category's prompts array
    await PromptCategory.findByIdAndUpdate(prompt.category, { $pull: { prompts: prompt._id } });

    await prompt.remove(); // Delete the prompt document itself
    res.json({ message: "Prompt deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.findByCategory = async (req, res) => {
  try {
    const prompts = await Prompt.find({
      category: req.params.categoryId,
    }).populate("category")
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
