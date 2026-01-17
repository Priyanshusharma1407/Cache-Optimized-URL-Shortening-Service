
# Cache-Optimized URL Shortening Service

A backend URL shortening service built using **Node.js and Express**, designed with a strong focus on **system design fundamentals**, **performance**, and **clean architecture**, while operating under **zero-cost infrastructure constraints**.

---

## 🚀 Features

- Shorten long URLs into compact, shareable links
- Redirect short URLs to original destinations
- Collision-free short code generation using **Base62 encoding**
- Click count tracking with analytics API
- **In-memory caching** to optimize redirect performance
- **IP-based rate limiting** to prevent abuse
- URL expiry support
- Clean, layered backend architecture

---

## 🏗️ Architecture Overview

The project follows a **layered architecture**, where each layer has a single responsibility and clear boundaries.

```

Client (Browser / curl)
↓
Express Routes
↓
Controllers
↓
Services
↓
Cache / Database

```

### Layer Responsibilities

- **Routes**: URL → controller mapping  
- **Controllers**: HTTP handling and validation  
- **Services**: Business logic, caching strategy, and coordination  
- **Models**: Database access and SQL queries  
- **Utilities**: Reusable helpers (cache, Base62 encoder)

This separation improves maintainability, testability, and scalability.

---

## 🔁 Request Flow (Redirect)

```

GET /:shortCode
↓
Route matches request
↓
Controller extracts shortCode
↓
Service checks in-memory cache
↓
Cache miss → database lookup
↓
Expiry validation
↓
Click count increment (atomic)
↓
Cache update
↓
302 Redirect to original URL

```

---

## ⚡ Performance Optimizations

- **Cache-first strategy** for redirect requests (read-heavy path)
- Reduced database reads by serving cached mappings
- Atomic SQL updates for click counts
- Rate limiting applied only to hot redirect endpoints

---

## 🛡️ Security & Reliability

- Input validation for URLs
- **IP-based rate limiting** (fixed window) to mitigate abuse
- Graceful handling of expired or invalid links
- Defensive design to handle real-world browser behavior

---

## 📊 Analytics API

Retrieve usage statistics for any short URL:

```

GET /api/stats/:shortCode

````

Returns:
- Original URL
- Click count
- Creation time
- Expiry time (if any)

---

## 💸 Zero-Cost Design Philosophy

This project was intentionally built using **free and local tooling**:

- SQLite for persistence
- In-memory cache instead of Redis
- No paid cloud services

### Production-Ready Extensions (Documented)
- Replace cache with **Redis**
- Add **CDN** for global redirects
- Async click logging using queues (Kafka / Redis Streams)
- Horizontal scaling with stateless services

---

## ⚖️ Design Trade-offs

- In-memory cache resets on server restart
- Browser speculative requests can affect click accuracy
- Single-node database (SQLite)

These trade-offs are **acknowledged and documented**, with clear paths to production-grade solutions.

---

## 🧠 Why This Project Matters

This project demonstrates:
- System design thinking beyond CRUD
- Performance-aware backend design
- Clean separation of concerns
- Real-world debugging and trade-off analysis

It is designed to be **interview-explainable**, not just functional.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **SQLite**
- In-memory LRU cache
- JavaScript (ES6+)

---

## 📌 How to Run Locally

```bash
npm install
node src/server.js
````

Server runs on:

```
http://localhost:3000
```


