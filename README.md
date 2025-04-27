# :star2: About the Project

# Toolbox

This project consists of a Node.js/Express backend and a React/Vite frontend, designed to work together as a complete application.

## :key: Environment Variables

### Backend

To run the backend, you can use the provided `env.example` file. Simply copy it and rename it to `.env`:

```bash
cp env.example .env
```

Example `.env` file:

```bash
PORT=3000
CORS_ORIGIN=*
SECRET_SERVICE_URL="https://example.com"
SECRET_SERVICE_KEY="key"
USE_LOGGER=false
```

### Frontend

To run the frontend, you can use the provided `env.example` file. Simply copy it and rename it to `.env`:

```bash
cp env.example .env
```

Example `.env` file:

```bash
VITE_API_URL="http://localhost:3000/api"
```

## :toolbox: Getting Started

### :bangbang: Prerequisites

Make sure you have the following installed:

- **Node.js**: v16 or higher for the backend, v18 or higher for the frontend.
- **npm**: v6 or higher.
- **Docker and Docker Compose**: For containerized deployment.

### :gear: Installation

Follow these steps to install dependencies for both the backend and frontend:

1. Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Navigate to the frontend directory and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

### :test_tube: Running Tests

To run tests for the backend:

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Run the tests:

    ```bash
    npm run test
    ```

### :running: Run Locally

To run the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/rawr-code/test-toolbox
    ```

2. Navigate to the project directory:

    ```bash
    cd test-toolbox
    ```

3. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

4. Start the frontend server:

    ```bash
    cd frontend
    npm run dev
    ```


### :whale: Running with Docker Compose

To run the project using Docker Compose, follow these steps:

1. Make sure Docker and Docker Compose are installed on your system.

2. Clone the repository if you haven't already:

    ```bash
    git clone https://github.com/rawr-code/test-toolbox
    ```

3. Navigate to the project directory:

    ```bash
    cd test-toolbox
    ```

4. Start the services using Docker Compose:

    ```bash
    docker-compose up
    ```

5. Access the application:

    - Backend: `http://localhost:3000`
    - Frontend: `http://localhost:8080`

6. To stop the services, press `Ctrl+C` and run:

    ```bash
    docker-compose down
    ```

## :wave: Contributing

Contributions are always welcome! To see the list of contributors, visit:

<a href="https://github.com/rawr-code/pichincha-bank/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rawr-code/pichincha-bank" />
</a>

## :handshake: Contact

For any inquiries, feel free to reach out:

Emmanuel Villegas - [My website](https://www.emmanuelvillegas.com/) - [Contact Us](mailto:emmanuelvillegasgonzalez@gmail.com)
