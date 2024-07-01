# TeamHub Client

#### This is the frontend client for the TeamHub project, built with React. TeamHub is a collaborative platform for project management, document collaboration, and feedback collection.
[server-side-repository](https://github.com/sagar-biswas1/teamwork-hub-server)

## Table of Contents

- [Features](#features)
- [Tech](#technology)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Project Management**: Create, read, update, and delete projects.
- **Document Collaboration**: Real-time document editing and collaboration.
- **Feedback Collection**: Submit and view feedback for projects and documents.
- **User Authentication**: Secure user authentication and authorization.
- **Role Management**: Manage user roles and permissions.
- **Responsive Design**: Fully responsive and mobile-friendly design.
- **Tailwind CSS**: Aesthetic and customizable UI using Tailwind CSS.

## Tech

TeamHub uses a number of open source projects to work properly:

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
- [tanstack query](https://tanstack.com/query/latest)
- [Socket io]

## Installation

To set up the client locally, follow these steps:

 **Clone the repository:**
   ```bash
      > git clone  https://github.com/sagar-biswas1/teamwork-hub-client.git
      > teamwork-hub-client
      > npm install
      > Create a .env file in the root directory and add the required environment variables (see the Environment Variables section).
      > npm run dev
   ```
## Usage
The client interacts with the TeamHub server to provide a seamless user experience for project management, document collaboration, and feedback collection. You can navigate through the application to explore various features.

## Environment Variables
The client requires several environment variables to be set. Create a .env.local file in the root directory and add the following:
```bash
VITE_SOCKET_ENDPOINT = "http://localhost:4000"
VITE_BASE_URL_SERVER = "http://localhost:4000/api"
```

## Deployment
1.  **Deploying to Firebas**


Create a new project in firebase:
1. Install Firebase CLI: 
    ```bash
     npm install -g firebase-tools
    ```
2. Login to firebae :
    ```bash 
    firebase login
    ```
3. Initialize firebase 
    ```bash
    firebase init
    ```
    Select "Hosting" and choose the project you want to deploy.
    Set 'dist' as the public directory.
    Configure as a single-page app by answering Yes.

4. Build the project: **Before build make sure to change the env file . The URL will be your live server links**
    ```bash
      npm run build
      ```
5. Deploy to Firebase:
    ```bash
    firebase deploy
    ```
