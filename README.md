# dialr — Smart Contact Organizer (CircleBook)

A clean, modern, and beginner-friendly full-stack Contact Book web application built with **Java Spring Boot**, **MySQL**, and **React.js**.

---

## 📌 Project Overview

**dialr** (also known as CircleBook) helps individuals organize, search, and manage personal and professional contacts in one place. Built following a standard layered architecture, it provides full CRUD (Create, Read, Update, Delete) functionality, favorites filtering, category organization, live keyword searching, and database persistence.

---

## 🚀 Features

- **Add Contact**: Save contacts with Name, Phone, Email, Company, Category, Notes, and Favorite flag.
- **View Contacts**: Clean card layout with initials-based avatars, contact details, and category badges.
- **Edit Contact**: Modify existing contact details directly via a responsive modal form.
- **Delete Contact**: Permanent record removal with a safe confirmation dialog.
- **Search Contacts**: Real-time search across contact names, phone numbers, and emails.
- **Filter Contacts**: Filter by categories (**Work**, **Friends**, **Family**, **Other**) and view all contacts.
- **Favorites System**: One-click star/unstar toggle with persistent database storage.
- **Summary Metrics**: Live statistics for Total Contacts, Favorites, Work Contacts, and Other Contacts computed from real API data.
- **Validation & Reliability**: Frontend and backend input validation (Name and Phone required, valid Email format), friendly empty states, and error alerts.

---

## 🛠️ Technology Stack

### Backend
- **Language**: Java (JDK 17+)
- **Framework**: Spring Boot 3.3.4
  - `spring-boot-starter-web` (RESTful APIs)
  - `spring-boot-starter-data-jpa` (Hibernate ORM & Spring Data JPA)
  - `spring-boot-starter-validation` (Bean Validation)
- **Database Driver**: `mysql-connector-j`
- **Build Tool**: Maven

### Database
- **Engine**: MySQL 8.0+ / MariaDB (e.g. via XAMPP)
- **Database Name**: `circlebook_db`
- **Table Name**: `contacts`

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (No Tailwind, No external UI libraries)

---

## 📂 Project Folder Structure

```text
c:\PROJECTS\anissha-portfolio\
├── backend/
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/circlebook/
│       │   │   ├── CircleBookApplication.java
│       │   │   ├── controller/
│       │   │   │   └── ContactController.java
│       │   │   ├── dto/
│       │   │   │   └── ContactRequest.java
│       │   │   ├── entity/
│       │   │   │   └── Contact.java
│       │   │   ├── exception/
│       │   │   │   ├── GlobalExceptionHandler.java
│       │   │   │   └── ResourceNotFoundException.java
│       │   │   ├── repository/
│       │   │   │   └── ContactRepository.java
│       │   │   └── service/
│       │   │       └── ContactService.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│           └── java/com/circlebook/
│               └── CircleBookApplicationTests.java
│
├── frontend/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── components/
│       │   ├── ConfirmDialog.jsx
│       │   ├── ContactCard.jsx
│       │   ├── ContactForm.jsx
│       │   ├── ContactList.jsx
│       │   ├── Header.jsx
│       │   ├── SearchBar.jsx
│       │   ├── Sidebar.jsx
│       │   └── SummaryCards.jsx
│       ├── services/
│       │   └── contactService.js
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

---

## 📋 Prerequisites

Before running the application, ensure you have:
1. **Java JDK 17 or higher** installed (`java -version`).
2. **Node.js (v18+) & npm** installed (`node -v`, `npm -v`).
3. **MySQL Server** installed and running (e.g., MySQL 8 or XAMPP MySQL on port `3306`).

---

## 🗄️ MySQL Database Setup

1. Start your local MySQL service (e.g. from XAMPP Control Panel or Windows Services).
2. Open your terminal or MySQL command line and run:
   ```sql
   CREATE DATABASE IF NOT EXISTS circlebook_db;
   ```
3. Hibernate will automatically generate and update the `contacts` table structure on backend startup.

### Table Schema (`contacts`)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `name` | `VARCHAR(100)` | NOT NULL | Full name of the contact |
| `phone` | `VARCHAR(20)` | NOT NULL | Contact telephone number |
| `email` | `VARCHAR(100)` | NULL | Optional email address |
| `company` | `VARCHAR(100)` | NULL | Optional organization |
| `category` | `VARCHAR(50)` | NOT NULL | Work, Friends, Family, Other |
| `notes` | `TEXT` | NULL | Additional remarks |
| `favorite` | `BIT(1)` | NOT NULL, DEFAULT 0 | 1 if favorite, 0 otherwise |
| `created_at` | `DATETIME(6)` | NOT NULL | Creation timestamp |

---

## ⚙️ Backend Configuration & Run Commands

The backend configuration is located in `backend/src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=dialr-backend

# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/circlebook_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Steps to Run the Backend (Windows Terminal)

Open a terminal in the project directory:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
*(The backend will start on `http://localhost:8080`)*

To run backend tests:
```powershell
cd backend
.\mvnw.cmd test
```

---

## 💻 Frontend Configuration & Run Commands

The frontend communicates with the backend via the URL defined in `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api/contacts
```

### Steps to Run the Frontend (Windows Terminal)

Open a new terminal window:
```powershell
cd frontend
npm install
npm run dev
```
*(The frontend will start on `http://localhost:5173` or `http://127.0.0.1:5173`)*

To build the frontend for production:
```powershell
cd frontend
npm run build
```

---

## 📡 REST API Documentation

| HTTP Method | Endpoint | Description | Sample Request / Query |
|---|---|---|---|
| `GET` | `/api/contacts` | Get all contacts | Supports `?category=Work` or `?favorite=true` |
| `GET` | `/api/contacts/{id}` | Get single contact by ID | `/api/contacts/1` |
| `POST` | `/api/contacts` | Create a new contact | JSON Body (`name`, `phone`, `email`, etc.) |
| `PUT` | `/api/contacts/{id}` | Update existing contact | JSON Body (`name`, `phone`, `email`, etc.) |
| `DELETE` | `/api/contacts/{id}` | Delete contact by ID | `/api/contacts/1` |
| `PATCH` | `/api/contacts/{id}/favorite` | Toggle favorite status | Returns updated contact |
| `GET` | `/api/contacts/search` | Search by query keyword | `/api/contacts/search?query=sarah` |

---

## 💡 Troubleshooting Tips

1. **MySQL connection failure (`10061`)**:
   - Ensure MySQL is running on port 3306.
   - If using XAMPP, open XAMPP Control Panel and click **Start** next to MySQL.
2. **Port 8080 already in use**:
   - Change `server.port=8081` in `application.properties` and update `VITE_API_BASE_URL` in `frontend/.env`.
3. **CORS issues**:
   - The `ContactController` is annotated with `@CrossOrigin(origins = "*")`, enabling access from any local dev port.
