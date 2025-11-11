# MoneyMap

MoneyMap is a financial application designed to help users manage their finances effectively. This project is built using the MERN stack with JWT authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Track income and expenses
- Visualize spending with charts and graphs
- Set and monitor financial goals
- Manage multiple accounts

## Installation

To install and run MoneyMap locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/AadityaBajgain/MoneyMap.git
    ```
2. Navigate to the project directory:
    ```sh
    cd MoneyMap
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the backend server:
    ```sh
    cd backend
    npm start
    ```
5. Start the frontend:
    ```sh
    cd frontend
    npm start
    ```
6. Open `http://localhost:3000` in your web browser to start using the application.

### Environment variables

Create `backend/.env` with the following entries:

```
FrontendURL=<URL that should be allowed by CORS, e.g. http://localhost:5173>
MONGO_URL=<Full MongoDB connection string>
MONGO_DB_NAME=<Database name that the MongoDB user can access>
SECRET=<JWT signing secret>
```

For local development, point `frontend/.env` to the backend:

```
VITE_API_URL=http://localhost:3001
```

When deploying, create `frontend/.env.production` with the hosted API URL (e.g. `VITE_API_URL=https://money-map-blush.vercel.app`) and update the backend’s `FrontendURL`/`FRONTEND_URL` env to your frontend origin (e.g. `https://money-map-reqf.vercel.app`).

## Usage

- Add your income and expenses to keep track of your financial activities.
- Use the dashboard to get an overview of your financial status.
- Set financial goals and track your progress.

## Screenshots
**LogIn Page** <img width="1861" height="981" alt="Screenshot 2025-11-11 at 10 10 25" src="https://github.com/user-attachments/assets/dc0289ed-873c-490f-a67a-2c8f3907dc5d" />


**Dashboard**
<img width="1802" height="973" alt="Screenshot 2025-11-11 at 10 10 54" src="https://github.com/user-attachments/assets/3a61ef12-0673-4b1a-b8f6-44c24aca0526" />



## Tech Stack

- **MongoDB**: Database used to store application data.
- **Express.js**: Backend framework used to build the server and API.
- **React**:  Frontend library used to build the user interface.
- **Node.js**: JavaScript runtime used to run the backend server.
- **JWT**: Used for authentication and securing user sessions.
- **TailwindCSS**: A utility-first CSS framework used to rapidly build custom user interfaces.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Add feature"
    ```
4. Push to the branch:
    ```sh
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out.

- **GitHub**: [AadityaBajgain](https://github.com/AadityaBajgain)
