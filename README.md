```markdown
# 📚 Library Management System API

A simple RESTful API for managing books in a library. Built using **Node.js**, **Express**, **Prisma ORM**, and **JWT Authentication**.

---

## ⚙️ Installation

```bash
# Step 1: Install dependencies
npm i

# Step 2: Generate Prisma client
npx prisma generate

# Step 3: Create a `.env` file in the root and add your database URL:
# Example:
# DATABASE_URL="postgresql://user:password@localhost:5432/library_db"

# Step 4: Run the application
node index.js
```

---

## 🔐 Authentication

### Register  
**Endpoint:** `POST /api/auth/register`  
**Body:**
```json
{
  "email": "user3@example.com",
  "password": "1234"
}
```

### Login  
**Endpoint:** `POST /api/auth/login`  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "1234"
}
```

> ✅ Returns a JWT token. Use this in the `Authorization` header for all protected routes:
```
Authorization: Bearer <your_token>
```

---

## 📘 Book Routes (Protected)

### ➕ Add a Book  
**POST** `/api/book/addBook`  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andy Hunt",
  "category": "Software Engineering",
  "price": 799.99,
  "rating": 4.8,
  "publishedDate": "1999-10-30"
}
```

---

### ✏️ Update a Book  
**PUT** `/api/book/udpateBook/:id`  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "title": "The Pragmatic Programmer 1",
  "author": "Andy Hunt",
  "category": "Software Engineering",
  "price": 799.99,
  "rating": 4.8,
  "publishedDate": "1999-10-30"
}
```

---

### ❌ Delete a Book  
**DELETE** `/api/book/deleteBook/:id`  
**Headers:** `Authorization: Bearer <token>`

---

### 📚 Get All Books  
**GET** `/api/book/getAllBooks`  
**Headers:** `Authorization: Bearer <token>`

---

### 🔍 Get Book by ID  
**GET** `/api/book/getBook/:id`  
**Headers:** `Authorization: Bearer <token>`

---

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **JWT for Auth**
- **Bcrypt for Hashing**
- **PostgreSQL** / **SQLite**

---

## 📂 Project Structure

```
├── controllers/
│   ├── auth/
│   └── book/
├── middlewares/
├── routes/
├── prisma/
│   └── schema.prisma
├── utils/
├── index.js
├── .env
```

---

## 🧪 Testing API

Use **Postman** or **Thunder Client**:

1. Register → Get Token  
2. Login → Get Token  
3. Use Token in Header to access book routes

---

## ✍️ Author

**Aastha Kumari**  
Backend Developer 

---

```