# Worko API

## Getting Started

### Prerequisites

- Node.js
- MongoDB

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

### Running Tests

```sh
npm test
