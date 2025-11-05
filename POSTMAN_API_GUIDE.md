# 🚀 Products API - Postman Testing Guide

## 📋 Overview
Complete CRUD API testing guide for the Products API with sample requests and responses.

**Base URL:** `http://localhost:3000/api/v1/products`

## 🛠️ Setup Instructions

### 1. Start Rails Server
```bash
cd task-repo
rails server
```
Server will run on: `http://localhost:3000`

### 2. Create Demo Data
```bash
ruby db/apiActions/create_demo_data.rb
```
This creates 5 sample products for testing.

---

## 📚 API Endpoints & Postman Requests

### 1. 📋 GET /api/v1/products - List All Products

**Method:** `GET`  
**URL:** `http://localhost:3000/api/v1/products`

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "MacBook Pro 16-inch",
    "description": "Powerful laptop for developers with M3 chip, 16GB RAM, 512GB SSD",
    "price": "2499.99",
    "stock": 15,
    "tags": "electronics,laptop,apple,developer",
    "created_at": "2025-11-04T14:11:56.000Z",
    "updated_at": "2025-11-04T14:11:56.000Z"
  },
  {
    "id": 2,
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium noise-cancelling wireless headphones with 30-hour battery life",
    "price": "299.99",
    "stock": 25,
    "tags": "electronics,audio,bluetooth,headphones",
    "created_at": "2025-11-04T14:11:56.000Z",
    "updated_at": "2025-11-04T14:11:56.000Z"
  }
]
```

---

### 2. 🔍 GET /api/v1/products/{id} - Get Single Product

**Method:** `GET`  
**URL:** `http://localhost:3000/api/v1/products/1`

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "MacBook Pro 16-inch",
  "description": "Powerful laptop for developers with M3 chip, 16GB RAM, 512GB SSD",
  "price": "2499.99",
  "stock": 15,
  "tags": "electronics,laptop,apple,developer",
  "created_at": "2025-11-04T14:11:56.000Z",
  "updated_at": "2025-11-04T14:11:56.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

---

### 3. ➕ POST /api/v1/products - Create New Product

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/products`  
**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "product": {
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with Pro camera system and A17 chip",
    "price": 999.99,
    "stock": 20,
    "tags": "electronics,phone,apple,mobile"
  }
}
```

**Expected Response (201 Created):**
```json
{
  "id": 6,
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with Pro camera system and A17 chip",
  "price": "999.99",
  "stock": 20,
  "tags": "electronics,phone,apple,mobile",
  "created_at": "2025-11-04T14:15:23.000Z",
  "updated_at": "2025-11-04T14:15:23.000Z"
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "name": ["can't be blank", "Product with this name already exists"],
  "price": ["must be greater than or equal to 0"],
  "stock": ["must be an integer"]
}
```

---

### 4. ✏️ PUT /api/v1/products/{id} - Update Product

**Method:** `PUT` or `PATCH`  
**URL:** `http://localhost:3000/api/v1/products/1`  
**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "product": {
    "name": "MacBook Pro 16-inch (Updated)",
    "price": 2299.99,
    "stock": 12
  }
}
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "name": "MacBook Pro 16-inch (Updated)",
  "description": "Powerful laptop for developers with M3 chip, 16GB RAM, 512GB SSD",
  "price": "2299.99",
  "stock": 12,
  "tags": "electronics,laptop,apple,developer",
  "created_at": "2025-11-04T14:11:56.000Z",
  "updated_at": "2025-11-04T14:16:45.000Z"
}
```

---

### 5. 🗑️ DELETE /api/v1/products/{id} - Delete Product

**Method:** `DELETE`
**URL:** `http://localhost:3000/api/v1/products/1`

**Expected Response (200 OK):**
```json
{
  "message": "MacBook Pro 16-inch deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

---

## 🧪 Complete Testing Workflow

### Step 1: Create Demo Data
```bash
ruby db/apiActions/create_demo_data.rb
```

### Step 2: Test All Endpoints in Postman

1. **GET /api/v1/products** - Should return 5 products
2. **GET /api/v1/products/1** - Should return first product
3. **POST /api/v1/products** - Create new product (use sample JSON above)
4. **PUT /api/v1/products/{new_id}** - Update the product you just created
5. **DELETE /api/v1/products/{new_id}** - Delete the product
6. **GET /api/v1/products/{new_id}** - Should return 404 (product deleted)

### Step 3: Test Error Cases

1. **GET /api/v1/products/999** - Non-existent ID (404)
2. **PUT /api/v1/products/999** - Update non-existent (404)
3. **DELETE /api/v1/products/999** - Delete non-existent (404)
4. **POST /api/v1/products** with invalid data (422)

---

## 📋 Sample Postman Collection

### Collection JSON (Import into Postman):
```json
{
  "info": {
    "name": "Products API",
    "description": "CRUD operations for Products"
  },
  "item": [
    {
      "name": "Get All Products",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/v1/products",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "v1", "products"]
        }
      }
    },
    {
      "name": "Get Single Product",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/v1/products/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "v1", "products", "1"]
        }
      }
    },
    {
      "name": "Create Product",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"product\": {\n    \"name\": \"Test Product\",\n    \"description\": \"A test product\",\n    \"price\": 99.99,\n    \"stock\": 10,\n    \"tags\": \"test\"\n  }\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/v1/products",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "v1", "products"]
        }
      }
    }
  ]
}
```

---

## 🔍 Validation Rules

- **name**: Required, unique (case-insensitive), string
- **price**: Must be >= 0, decimal
- **stock**: Must be integer >= 0
- **description**: Optional text
- **tags**: Optional string

## 🎯 Quick Test Commands

```bash
# Start server
rails server

# Create demo data
ruby db/apiActions/create_demo_data.rb

# Run automated tests
ruby db/apiActions/test_products_api.rb
```

Happy API testing! 🚀
