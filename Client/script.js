document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "5892c1cc-c090-4797-94f3-e2a808bad1c9"

  // Set the DeepAI API key

  deepai.setApiKey(apiKey)
  //////////////////////////////////////////////////////////////////////////////////////

  // Define variables for corresponding elements from HTML.
  const askBtn = document.getElementById("askBtn")
  const copyBtn = document.getElementById("copyBtn")
  const overlay = document.getElementById("overlay") // Overlay for loading screen
  const improvePromptBtn = document.getElementById("improvePromptBtn")
  const improveResponseBtn = document.getElementById("improveResponseBtn")
  const clearHistoryBtn = document.getElementById("clearHistoryBtn")
  const clearInputBtn = document.getElementById("clearInputBtn")
  // const pressEnterKey = document.getElementById("inputPrompt") // for "Enter" keydown event
  const createPromptBtn = document.getElementById("createPromptBtn")

  //////////////////////////////////////////////////////////////////////////////////////

  // Function to save message to localStorage and chat history

  const saveMessage = (prompt, response) => {
    // Load existing chat history. If no history is available, create an empty array.
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || []

    let timeStamp = new Date().toLocaleTimeString()

    // Create new message object that gets pushed to history
    let message = {
      timeStamp: timeStamp,
      prompt: prompt,
      response: response,
    }

    // Add the new message to the chat history
    chatHistory.push(message)

    // Save the updated chat history back to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory))

    // Add the newest prompt, message and respective timestamp to the chat history div
    displayChatHistory(chatHistory)
  }

  const displayChatHistory = (chatHistory) => {
    let historyDiv = document.getElementById("chatHistory")
    historyDiv.innerHTML = "" // clears the historyDiv for fresh display
    chatHistory.forEach((chat) => {
      historyDiv.innerHTML += `<p><strong>${chat.timeStamp}</strong><br><br><strong>Prompt:</strong><br><br> ${chat.prompt}<br><br><strong>Response:</strong><br><br>${chat.response}<br></p><hr>`
    })
  }
  // Load the chat history on page load
  window.onload = () => {
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || []
    displayChatHistory(chatHistory)
  }

  //////////////////////////////////////////////////////////////////////////////////////

  //Function to send request, IE Ask Amaai

  const askAmaai = async () => {
    try {
      // Get the prompt from the input textarea
      const prompt = document.getElementById("inputPrompt").value

      // Show the overlay
      overlay.style.display = "flex"

      // Call the DeepAI API and pass in prompt
      let apiResponse = await deepai.callStandardApi("text-generator", {
        text: prompt,
      })

      // Log the entire response to determine API structure
      console.log(apiResponse)

      // Save conversation to the chat history
      saveMessage(prompt, apiResponse.output)

      // Output generated response
      document.getElementById("response").innerText = apiResponse.output

      // Hide the overlay
      overlay.style.display = "none"
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////

  // Function for "Enter" keydown event in the input text area.

  // pressEnterKey.addEventListener("keydown", function (e) {
  //   console.log("Enter key pressed")
  //   // Check if the key pressed was Enter
  //   if (e.key === "Enter") {
  //     // If it was, prevent he default action (which is to add a newline)
  //     e.preventDefault()
  //     // And call the askAmaai function
  //     askAmaai()
  //   }
  // })

  //////////////////////////////////////////////////////////////////////////////////////

  //Function to improve prompt

  improvePromptBtn.addEventListener("click", async () => {
    try {
      // Get the original prompt and the response
      let initialPrompt = document.getElementById("inputPrompt").value

      // Show the overlay
      overlay.style.display = "flex"

      let aiInput = `"Original Prompt": "${initialPrompt}"\n\n"Task": "Elaborate and enhance the 'Original Prompt' to make it more effective in eliciting a comprehensive and insightful response. Maintain the essence of the original question, but reformulate it to extract more detailed and meaningful information."`

      // Call the DeepAI API
      let aiResponse = await deepai.callStandardApi("text-generator", {
        text: aiInput,
      })

      // The AI's output is the improved prompt. Display this in the output textarea
      document.getElementById("response").innerText = aiResponse.output

      // Also add this improved prompt to the chat history
      saveMessage("AI improved prompt", aiResponse.output)

      // Hide the overlay
      overlay.style.display = "none"
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })
  //////////////////////////////////////////////////////////////////////////////////////

  //Function to improve Response

  improveResponseBtn.addEventListener("click", async () => {
    try {
      // let initialPrompt = document.getElementById("inputPrompt").value
      let initialResponse = document.getElementById("response").value

      overlay.style.display = "flex"

      let aiInput = `"Original Response": "${initialResponse}"\n\n"Task": "Improve and expand the original response, maintaining the original context and providing additional details."`

      let aiResponse = await deepai.callStandardApi("text-generator", {
        text: aiInput,
      })

      // The AI's output is the improved response. Display this in the output textarea
      document.getElementById("response").innerText = aiResponse.output

      saveMessage("AI improved response", aiResponse.output)

      overlay.style.display = "none"
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  //////////////////////////////////////////////////////////////////////////////////////

  // Function to copy Amaai's response

  copyBtn.addEventListener("click", () => {
    const amaaiResponse = document.getElementById("response")
    navigator.clipboard
      .writeText(amaaiResponse.value)
      .then(() => {
        console.log("Response successfully copied!")
      })
      .catch((error) => {
        console.log("Response NOT successfully copied!", error)
      })
  })

  //////////////////////////////////////////////////////////////////////////////////////

  //Function to clear History

  clearHistoryBtn.addEventListener("click", () => {
    // Clear the chat history from the local storage
    localStorage.removeItem("chatHistory")

    // Clear the chat history from the div on the page
    let historyDiv = document.getElementById("chatHistory")
    historyDiv.innerHTML = ""
  })

  //////////////////////////////////////////////////////////////////////////////////////

  //Function to clear input area

  clearInputBtn.addEventListener("click", () => {
    let inputTextArea = document.getElementById("inputPrompt")
    inputTextArea.value = ""
  })

  //////////////////////////////////////////////////////////////////////////////////////
  // Event listeners

  //leaving this event listener un-nested for now in case I might want to call the askAmaai function in future features
  askBtn.addEventListener("click", askAmaai)
})

//////////////////////////////////////////////////////////////////////////////////////

// Get user input elements and button elements
const titleInput = document.querySelector("#title")
const descriptionInput = document.querySelector("#description")
const categorySelect = document.querySelector("#category")
const newCategoryInput = document.querySelector("#newCategory")
const createPromptBtn = document.querySelector("#create-prompt-btn")
const searchCategorySelect = document.querySelector("#searchCategory")
const searchPromptsBtn = document.querySelector("#searchPromptsBtn")
const promptsList = document.querySelector("#promptsList")
const userPromptsSelect = document.querySelector("#userPrompts")
const deletePromptBtn = document.querySelector("#deletePromptBtn")
const categoriesUrl = "http://localhost:3001/api/promptCategories"

////////////////////////////////////////////

// Fetch userID from local storage
let userID = localStorage.getItem("userID")
console.log("User ID from local storage: ", userID)

////////////////////////////////////////////

// Function to populate user prompts dropdown

function populateUserPrompts() {
  console.log("populateUserPrompts function is being called")

  fetch(`http://localhost:3001/api/users/${userID}`)
    .then((response) => {
      console.log("Response from server: ", response)
      return response.json()
    })
    .then((user) => {
      console.log("User data: ", user)
      userPromptsSelect.innerHTML = "" // Clear the dropdown first
      user.prompts.forEach((prompt) => {
        const option = document.createElement("option")
        option.value = prompt._id
        option.text = prompt.title
        userPromptsSelect.add(option)
      })
    })
    .catch((error) => console.error("Error:", error))
}
////////////////////////////////////////////

function populateCategories() {
  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((categories) => {
      categorySelect.innerHTML = ""; // Clear the dropdown first
      searchCategorySelect.innerHTML = ""; // Clear the dropdown first

      categories.forEach((category) => {
        const option1 = document.createElement("option");
        option1.value = category._id;
        option1.text = category.name;
        categorySelect.add(option1);

        const option2 = document.createElement("option");
        option2.value = category._id;
        option2.text = category.name;
        searchCategorySelect.add(option2);
      });

      // Call fetchCategories() to populate the delete category dropdown
      fetchCategories();
    })
    .catch((error) => console.error("Error:", error));
}



// Call these functions on page load to populate the dropdowns
populateUserPrompts()
populateCategories()

////////////////////////////////////////////

// When the search prompts button is clicked...
searchPromptsBtn.addEventListener("click", async (event) => {
  event.preventDefault()

  // Fetch prompts of the selected category.
  const categoryId = searchCategorySelect.value
  const response = await fetch(
    `http://localhost:3001/api/prompts/category/${categoryId}`
  )
  const prompts = await response.json()
  // const categoryData = await response.json()

  // Clear the prompts list.
  promptsList.innerHTML = ""

  // Display prompts in a list.
  prompts.forEach((prompt) => {
    const li = document.createElement("li")
    li.textContent = prompt.description

    // When a prompt is clicked, copy its description to the clipboard.
    li.addEventListener("click", () => {
      navigator.clipboard
        .writeText(prompt.description)
        .then(() => alert("Prompt copied to clipboard!"))
        .catch((error) => console.error("Error:", error))
    })

    promptsList.append(li)
  })
})

////////////////////////////////////////////

// When the delete prompt button is clicked...
deletePromptBtn.addEventListener("click", async (event) => {
  event.preventDefault()

  // Get the promptId from the dropdown.
  const promptId = userPromptsSelect.value

  // Ensure that promptId is defined and not an empty string.
  if (!promptId) {
    console.error("No prompt selected for deletion.")
    return
  }

  console.log("Prompt ID: ", promptId)

  // Send a DELETE request to remove the selected prompt.
  try {
    const response = await fetch(
      `http://localhost:3001/api/prompts/${promptId}`,
      {
        method: "DELETE",
      }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    // Remove the deleted prompt from the user prompts select.
    const option = userPromptsSelect.querySelector(
      `option[value="${promptId}"]`
    )
    userPromptsSelect.removeChild(option)
  } catch (error) {
    console.error("Error:", error)
  }
})
////////////////////////////////////////////

// When the create prompt button is clicked...
createPromptBtn.addEventListener("click", async (event) => {
  event.preventDefault()

  let promptTitle = titleInput.value
  let promptDescription = descriptionInput.value
  let promptCategory = categorySelect.value
  let newCategory = newCategoryInput.value

  // If the new category option is checked and newCategory is not empty, create a new category
  if (document.querySelector("#newCategoryOption").checked && newCategory) {
    try {
      const response = await fetch(
        "http://localhost:3001/api/promptCategories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategory }),
        }
      )

      const data = await response.json()
      promptCategory = data._id // Set promptCategory to the id of the new category

      // Repopulate categories dropdowns after a new category is created
      populateCategories()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  ////////////////////////////////////////////

  // Create a new prompt
  try {
    const response = await fetch("http://localhost:3001/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: promptTitle,
        description: promptDescription,
        category: promptCategory,
        user: userID,
      }),
    })

    const data = await response.json()
    console.log("Prompt created:", data)

    // Repopulate user prompts dropdown after a new prompt is created
    populateUserPrompts()
  } catch (error) {
    console.error("Error:", error)
  }
})

//////////////////////////////////////////////////////////////////////////////////////


// Fetch all categories to populate dropdown list
async function fetchCategories() {
  const response = await fetch('http://localhost:3001/api/promptCategories');
  const categories = await response.json();

  const deleteCategoryDropdown = document.getElementById('delete-category-dropdown');

  // Clear previous options
  deleteCategoryDropdown.innerHTML = '';

  // Create an option for each category
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category._id;
    option.textContent = category.name;
    deleteCategoryDropdown.appendChild(option);
  });
}

// Handle category deletion
document.getElementById('delete-category-button').addEventListener('click', async function() {
  const selectedCategoryId = document.getElementById('delete-category-dropdown').value;
  
  if (!selectedCategoryId) {
    console.log('No category selected');
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this category and all its prompts?");

  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:3001/api/promptCategories/${selectedCategoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // Refresh categories
      fetchCategories();

      console.log('Category deleted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.log('Category deletion cancelled');
  }
});
