# Worko API

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- jest
- supertest
- JWT

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/navaneethgade07/Worko_Backend_api_setup.git
    cd worko
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    PORT=3000
    DB_URL=mongodb://localhost:27017/worko
    JWT_SECRET=your_secret_key
    ```

4. Start the server:
    ```sh
    npm start
    ```

5. Api requests :
    - Send all api requests using postman or thunderclient extension in vscode.
    - For **POST** request send the required details to create a user.
    - For **GET** request(listallusers) you can retrieve the all the user details in the database.
    - For **GET** request(getuser) to retrieve a user by its userID.
    - **PUT** request to replace the whole existing data with the updated data.
    - **PATCH** request to update the existing data with the optional data.
    - **DELETE** request to soft delete a user by it's userID.

### Running Tests

```sh
npm test
