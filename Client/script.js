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

  //////////////////////////////////////////////////////////////////////////////////////
})
document.addEventListener("DOMContentLoaded", () => {
  const createPromptBtn = document.getElementById("createPromptBtn")
  const titleInput = document.getElementById("titleInput")
  const descriptionInput = document.getElementById("descriptionInput")
  

  createPromptBtn.addEventListener("click", (event) => {
    event.preventDefault() // prevent form from submitting normally
    let promptTitle = titleInput.value
    let promptDescription = descriptionInput.value
    let promptCategory = "6488b59d651b22a3fbae0b11"
    let userID = "6488b59d651b22a3fbae0b0e" 

    // Create a new prompt
    fetch("http://localhost:3001/api/promptRouter", {
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
      .then((response) => response.json())
      .then((data) => {
        console.log("Prompt created:", data)

        // Update the user's prompts array
        return fetch(`http://localhost:3001/api/users/${userID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompts: [...data.prompts, data._id],
          }),
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated with the prompt:", data)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  })
})
