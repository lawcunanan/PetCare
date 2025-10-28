# PetCare AI

PetCare AI is a web application that provides AI-powered assistance for pet care. It features a chat interface where users can ask questions and get advice about their pets. The application is built with React and Vite, and it uses Google's Gemini API for the AI chat functionality.

## Features

- **AI Chat:** Get instant answers to your pet-related questions from an AI assistant.
- **User Authentication:** Sign up and sign in to your account to save your chat history and pet information.
- **Pet Registration:** Add your pets to your profile to get more personalized advice.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, Vite
- **AI:** Google Gemini API
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm
- A Firebase project with Authentication and Firestore enabled.
- A Google Gemini API key.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/PetCare.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the `PetCare AI` directory and add your Firebase and Gemini API credentials:
    ```
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```
4.  Start the development server
    ```sh
    npm run dev
    ```

## API Setup

The application uses a proxy server to communicate with the Gemini API. The proxy is configured in `vite.config.js`. The server-side code for the proxy is in `api/gemini.js`.

You will also need to update `firebase/firebaseConfig.js` with your firebase configuration.

```javascript
// src/firebase/firebaseConfig.js
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
