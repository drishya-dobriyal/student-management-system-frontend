# Student Management System - Frontend

## Overview

The frontend for the Student Management System is developed using React. It provides the user interface to interact with the backend services for managing students, courses, and more.

## Prerequisites

Before setting up the frontend, make sure you have the following installed:

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).

## Setup

### 1. Clone the Repository

Clone the repository and navigate into the frontend directory:

    ```bash
    git clone https://github.com/drishya-dobriyal/student-management-system-frontend
    cd student-management-system/frontend
    ```

### 2. Install Dependencies

Install the frontend dependencies:

    ```bash
    npm install
    ```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:3000
    ```

Replace `http://localhost:3000` with your backend URL if different.

### 4. Start the Development Server

Start the React development server:

    ```bash
    npm start
    ```

The frontend will open in your default web browser at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
