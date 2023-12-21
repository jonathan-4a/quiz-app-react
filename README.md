# React Quiz App

This is a simple React quiz app that utilizes `json-server` to fetch quiz data from a `questions.json` file.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quiz-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd quiz-app-react
    ```

3. Install dependencies:

    ```bash
    yarn install
    ```

### Running the App

1. Start `json-server` to serve quiz data:

    ```bash
    json-server --watch src/questions.json --port 3000
    ```

    Replace `questions.json` with your quiz data file if it has a different name.

2. Update fetch link if you would like to use different port number in `src/pages/index.jsx`:

    Open the `src/pages/index.jsx` file and update the fetch link to point to your `json-server` endpoint:

    ```jsx
    window.fetch('http://localhost:3001/questions')
    ```

3. Run the React app:

    ```bash
    yarn start
    ```

## Features

- Multiple-choice questions
- Progress tracking
- Score calculation

## Acknowledgments

- This project is built using React and `json-server`.
