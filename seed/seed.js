const db = require("../db")
const mongoose = require("mongoose")
const User = require("../models/User")
const Prompt = require("../models/Prompt")
const Category = require("../models/PromptCategory")

// seed the database
const seedDB = async () => {
  // Delete all existing Users, Prompts, and Categories
  await User.deleteMany({})
  await Prompt.deleteMany({})
  await Category.deleteMany({})

  // Create two new users
  const user1 = new User({
    username: "user1",
    email: "user1@user.com",
    password: "password1",
  })
  const user2 = new User({
    username: "user2",
    email: "user2@user.com",
    password: "password2",
  })

  // Save the new users to the database
  await user1.save()
  await user2.save()

  // Define categories
  const categories = [
    "SEO",
    "Writing/Blogging",
    "Analyzing Data",
    "Reading",
    "General",
  ]

  // Define prompts
  const prompts = [
    {
      title: "Meta Tag best Practice",
      description: "Research the best meta tags for [topic]",
      category: "SEO",
    },
    {
      title: "Financial Planning blog help",
      description: "Blog post on [financial planning]?",
      category: "Writing/Blogging",
    },
    {
      title: "Create Table from Data",
      description: "Can you create a table from this data?: [your data]",
      category: "Analyzing Data",
    },
    {
      title: "Text Summary",
      description: "Can you please summarize this article for me? [your text]",
      category: "Reading",
    },
    {
      title: "Interview Help",
      description:
        "I'm interviewing for a software engineer position, can you give me some interview questions? ",
      category: "General",
    },
  ]

  //loop over each category in array and save to db
  for (let category of categories) {
    const newCategory = new Category({ name: category })
    await newCategory.save()
  }

  //loop over each prompt in array, find the category in db that matches it's category
  for (let prompt of prompts) {
    const category = await Category.findOne({ name: prompt.category })

    //create a new Prompt instance with the title and description of the prompt and the id of the category that was found in db
    const newPrompt = new Prompt({
      title: prompt.title,
      description: prompt.description,
      category: category._id,
    })

    // Using math.random to pick user1  if greater than .5 and user2, if not.assign user (by id) tobe the user of the prompt.
    const randomUser = Math.random() > 0.5 ? user1 : user2
    newPrompt.user = randomUser._id

    //save new prompt to db, then rinse an repeat for each prompt in array
    await newPrompt.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
