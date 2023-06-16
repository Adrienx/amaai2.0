# AmAai 2.0

## Project Description

Welcome to AmAai 2.0, the next iteration of the 'Ask Me Anything AI' application. Like its predecessor, AmAai 2.0 leverages an AI-powered text generation API to generate creative ideas for blog posts or simplify complex concepts. By providing a few keywords or a concise prompt, users receive comprehensive responses in seconds.

AmAai 2.0 introduces new features that enhance the user experience. Users can categorize prompts for more organized and efficient retrieval, update prompts to refine and adapt them to changing needs, and delete prompts and categories to maintain an organized workspace.

## New in AmAai 2.0

- **Prompt Categories**: Users can now categorize prompts for better organization and easy retrieval.
- **Update Prompts**: Users can update the details of an existing prompt to keep them relevant and useful.
- **Search Prompts**: Users can search all prompts by category, providing a streamlined way to access needed information.
- **Delete Functions**: AmAai 2.0 introduces the ability to delete a prompt or a category along with its associated prompts.

## User Stories

1. **Search All Prompts**: As a user, I want to search all prompts by category so that I can easily locate the prompts I'm interested in. I can then click on them to copy to clipboard for my use.
2. **Update a Prompt**: As a user, I want to be able to update an existing prompt, ensuring it remains relevant and useful to my needs.
3. **Delete a Prompt**: As a user, I want to delete a prompt that I no longer need, to maintain a clutter-free and organized list of prompts.
4. **Delete a Category**: As a user, I want to delete a category, including all its associated prompts, to maintain a relevant and meaningful categorization system.

## Developer Stories

1. **Set Up Controllers**: As a developer, I want to create controllers to manage routing logic, ensuring efficient handling of user requests. These controllers are responsible for handling interactions between the user and the database, defining what happens when certain API endpoints are accessed.

2. **Set Up DB**: As a developer, I want to establish a mongoDB database to store and manage application data, providing a robust and scalable infrastructure. The database is used to store prompts, categories, and user information, and is accessed using the Mongoose library for MongoDB.

3. **Set Up Models**: As a developer, I want to define models to interact with the database, enabling structured reading and writing of application data. These models represent the data in the database and define the schema for various collections such as Prompts and Categories.

4. **Set Up Routers**: As a developer, I want to define routers to handle various API endpoints, ensuring a clear and efficient pathway for handling user requests. These routers direct traffic in the application, specifying which controllers should be used for different endpoints.

5. **Set Up Seed File**: As a developer, I want to create a seed file to populate the database with initial data for testing purposes. This seed file contains initial data for prompts and categories which can be loaded into the database for development and testing.

6. **Configure Server.js File**: As a developer, I want to set up the server.js file to manage the server, forming the backbone of the application's operation. This file initializes and configures the Express.js server, sets up middleware, and connects to the MongoDB database.

7. **Write JS to Populate DOM**: As a developer, I want to use JavaScript to dynamically populate the DOM with data received from the backend, creating an interactive and responsive user interface. The JavaScript code in the application is responsible for creating dynamic content on the webpage, such as listing prompts or categories, handling form submissions, and managing modals.

## Technologies Used

AmAai 2.0 is built using a variety of technologies, including:

- [Express](https://expressjs.com/) - Node.js web application framework.
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for Node.js, used to interact with our MongoDB database.
- [DeepAI Text Generation API](https://deepai.org/) - This API is used to generate text based on the user's input.
- [Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) - Used to perform text sentiment analysis (planned for future iterations).

## Future Iterations

Additional features planned for future iterations include:

- **User Account System**: Implement a user account system, allowing users to have personalized prompt and category lists that are securely stored and accessible across multiple devices.
- **Google Authentication**: Implement Google authentication for easy and secure user login.
- **Text Sentiment Analysis** Text sentiment analysis powered by Microsoft Azure's Text Analytics API. This API will assist the user in tailoring the generated content to their desired purpose.
- **Text to Image Generation** - By entering descriptive prompts Amaai wil be able to generate images based on the input.

## Getting Started

AmAai 2.0 is a web-based application, no installation is required. Navigate to the website URL to start creating blog content and managing your prompts and categories.

## Progress Tracking

Keep up to date with the project's progress and upcoming features on the [Trello Board](https://trello.com/b/tcyLDx4u/)
