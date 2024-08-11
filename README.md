# Self-Destructing API

A Node.js application that provides a unique API for creating self-destructing routes.

## Features

- Dynamic Route Creation: Create routes dynamically with a specified path and method.
- Self-Destruction: Routes self-destruct after a defined number of requests or time period.
- Customizable Parameters: Set maximum request limits and TTL for each route.
- Logging: Log route creation, request count, and destruction events.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NIkoChopikashvili/self-destruct-api.git
   cd self-destruct-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory to configure environment variables. For example:

```
PORT=5000
```

## Running the Application

Start the server:

```bash
npm start
```

The server will be running on http://localhost:5000 by default.

## API Endpoints

### POST /api/create-route

Creates a new self-destructing route.

Request Body:
```json
{
  "path": "/test-route",
  "method": "get",
  "response": "This is a temporary route!",
  "maxRequests": 5,
  "ttl": 3600
}
```

- `path`: The route path (e.g., "/test-route").
- `method`: The HTTP method (e.g., "get").
- `response`: The response message to return when the route is accessed.
- `maxRequests`: Maximum number of requests before the route self-destructs.
- `ttl`: Time-to-live in milliseconds before the route self-destructs.

Response:
```json
{
  "message": "Route GET /test-route created."
}
```

### Accessing a Route

Once a route is created, you can access it using its path and HTTP method. For example:

```bash
curl http://localhost:5000/test-route
```

Response:
```
This is a temporary route!
```

## Contributing

Feel free to open issues or submit pull requests if you find bugs or have suggestions for improvements.
