# AI Chat Portal Frontend

This project is the frontend for an AI Chat Portal, providing an interactive user interface for engaging with an AI assistant. It features a modern design, real-time chat capabilities, and a listening popup for voice input.

## Features

*   **Interactive Chat Interface:** Send and receive messages with an AI assistant.
*   **Code Block Highlighting:** Displays code snippets clearly within the chat.
*   **Clipboard Functionality:** Easily copy code or text from messages.
*   **Voice Input Integration:** A listening popup indicates when the system is actively listening for user input.
*   **Dynamic Typing Animation:** Visual feedback when the AI is generating a response.
*   **Responsive Design:** Adapts to various screen sizes for a seamless user experience.
*   **Background Animation:** Engaging visual background for an enhanced user experience.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides an extremely fast development experience.
*   **Framer Motion:** A production-ready motion library for React.
*   **Material-UI (MUI):** A comprehensive suite of UI tools to help you ship new features faster.
*   **CSS:** For styling and animations.

## Setup

To get the project up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Project

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will typically start the application on `http://localhost:5173` (or another available port).

## Project Structure

The `src` directory contains the main source code for the frontend application:

```
src/
├───BackgroundAnimation.css   # Styles for the background animation
├───Chat.css                  # Styles for the main chat component
├───Chat.jsx                  # Main chat component logic
├───Clipboard.jsx             # Component for clipboard functionality
├───CodeBlock.jsx             # Component for displaying and highlighting code
├───ListeningPopup.css        # Styles for the listening popup
├───ListeningPopup.jsx        # Component for the voice input indicator
├───main.jsx                  # Entry point of the React application
├───Message.css               # Styles for individual chat messages
├───Message.jsx               # Component for displaying individual messages
├───Sidebar.jsx               # Sidebar component (if implemented)
├───TypingAnimation.css       # Styles for the typing animation
└───TypingAnimation.jsx       # Component for the typing indicator
```

## Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the project for code quality.
*   `npm run preview`: Locally previews the production build.

---
