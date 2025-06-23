# Product API

A simple Express.js REST API for managing products, with authentication, validation, filtering, pagination, search, and statistics.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your values:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```
   npm start
   ```
   The server will run at `http://localhost:3000` (or your specified port).

---

## Authentication

All product endpoints require a JWT token in the `Authorization` header.

- **Login to get a token:**
  ```
  POST /login
  ```
  **Response:**
  ```json
  {
    "token": "<your_jwt_token>"
  }
  ```

- **Use the token in requests:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```

---

## API Endpoints

### 1. **Login**

- **POST /login**
  - Returns a JWT token for authentication.

---

### 2. **Products**

#### **Get all products (with filtering & pagination)**
- **GET /api/products**
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: all)
- **Example:**
  ```
  GET /api/products?category=electronics&page=1&limit=2
  ```
- **Response:**
  ```json
  {
    "total": 5,
    "page": 1,
    "limit": 2,
    "products": [
      { "id": "...", "name": "...", ... }
    ]
  }
  ```

#### **Search products by name**
- **GET /api/products/search?name=term**
- **Example:**
  ```
  GET /api/products/search?name=laptop
  ```
- **Response:**
  ```json
  [
    { "id": "...", "name": "Laptop", ... }
  ]
  ```

#### **Get product statistics**
- **GET /api/products/stats**
- **Response:**
  ```json
  {
    "electronics": 3,
    "kitchen": 2
  }
  ```

#### **Get a product by ID**
- **GET /api/products/:id**
- **Response:**
  ```json
  { "id": "...", "name": "...", ... }
  ```

#### **Create a new product**
- **POST /api/products**
- **Body:**
  ```json
  {
    "name": "New Product",
    "description": "Description here",
    "price": 100,
    "category": "electronics",
    "inStock": true
  }
  ```
- **Response:**
  ```json
  {
    "id": "...",
    "name": "New Product",
    ...
  }
  ```

#### **Update a product**
- **PUT /api/products/:id**
- **Body:** (same as POST)
- **Response:** Updated product object

#### **Delete a product**
- **DELETE /api/products/:id**
- **Response:** `204 No Content` if successful

---

## Example Requests

**Get all products:**
```bash
curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:3000/api/products
```

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","description":"A new tablet","price":250,"category":"electronics","inStock":true}'
```

---

## Notes

- All endpoints (except `/login`) require a valid JWT token.
- Products are stored in-memory; changes are not persisted after server restart.
- For development/testing only.

---
```# Product API

A simple Express.js REST API for managing products, with authentication, validation, filtering, pagination, search, and statistics.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your values:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```
   npm start
   ```
   The server will run at `http://localhost:3000` (or your specified port).

---

## Authentication

All product endpoints require a JWT token in the `Authorization` header.

- **Login to get a token:**
  ```
  POST /login
  ```
  **Response:**
 ```json
  {
    "token": "<your_jwt_token>"
  }
  ```

- **Use the token in requests:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```

---

## API Endpoints

### 1. **Login**

- **POST /login**
  - Returns a JWT token for authentication.

---

### 2. **Products**

#### **Get all products (with filtering & pagination)**
- **GET /api/products**
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: all)
- **Example:**
  ```
  GET /api/products?category=electronics&page=1&limit=2
  ```
- **Response:**
  ```json
  {
    "total": 5,
    "page": 1,
    "limit": 2,
    "products": [
      { "id": "...", "name": "...", ... }
    ]
  }
  ```

#### **Search products by name**
- **GET /api/products/search?name=term**
- **Example:**
  ```
  GET /api/products/search?name=laptop
  ```
- **Response:**
  ```json
  [
    { "id": "...", "name": "Laptop", ... }
  ]
  ```

#### **Get product statistics**
- **GET /api/products/stats**
- **Response:**
  ```json
  {
    "electronics": 3,
    "kitchen": 2
  }
  ```

#### **Get a product by ID**
- **GET /api/products/:id**
- **Response:**
  ```json
  { "id": "...", "name": "...", ... }
  ```

#### **Create a new product**
- **POST /api/products**
- **Body:**
  ```json
  {
    "name": "New Product",
    "description": "Description here",
    "price": 100,
    "category": "electronics",
    "inStock": true
  }
  ```
- **Response:**
  ```json
  {
    "id": "...",
    "name": "New Product",
    ...
  }
  ```

#### **Update a product**
- **PUT /api/products/:id**
- **Body:** (same as POST)
- **Response:** Updated product object

#### **Delete a product**
- **DELETE /api/products/:id**
- **Response:** `204 No Content` if successful

---

## Example Requests

**Get all products:**
```bash
curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:3000/api/products
```

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","description":"A new tablet","price":250,"category":"electronics","inStock":true}'
```

---

## Notes

- All endpoints (except `/login`) require a valid JWT token.
- Products are stored in-memory; changes are not persisted after server restart.
- For development/testing