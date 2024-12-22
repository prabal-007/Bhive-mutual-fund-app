# Bhive Mutual Fund App

This is a full-stack mutual fund management app built with React (frontend), Node.js with Express (backend), PostgreSQL (database), and Prisma ORM. The app allows users to manage their mutual fund portfolio, select funds, and make investments.


Git Repository Link - [Bhive-mutual-fund-app](https://github.com/prabal-007/Bhive-mutual-fund-app)

# Prerequisites:
- **Node.js** (v14.x or later)
- **PostgreSQL** (or use Docker for database setup)
- **Docker** (for containerized setup)
- **Prisma CLI** (install with `npm install -g prisma`)

# Integration with RapidAPI:
Obtain an API key from [RapidAPI](https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav).
Add the key to the .env file as RAPIDAPI_KEY.

---

## Setup Instructions

## A. Non-Docker Setup:

Clone the Repository:

```bash
git clone https://github.com/prabal-007/Bhive-mutual-fund-app
cd bhive-mutual-fund-app/backend/
```

Install Dependencies:

```bash
npm install
```

Set Up .env File:

```bash
DATABASE_URL="postgresql-database-url"
RAPIDAPI_KEY="your-rapidapi-key"
```

Run Database Migrations:

```bash
npx prisma migrate deploy
```

start application:
```bash
npm run dev
```

## B. Docker Setup:

Clone the Repository:

```bash
git clone https://github.com/prabal-007/Bhive-mutual-fund-app
cd bhive-mutual-fund-app/backend/
```

Set Up .env File:

```bash
DATABASE_URL="postgresql-database-url"
RAPIDAPI_KEY="your-rapidapi-key"
```

Build and Run with Docker Compose:

```bash
docker-compose up --build
```

Run Prisma Migrations:

```bash
docker-compose exec backend npx prisma migrate deploy
```

## Frontend Setup (React App)

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Docker Setup for Frontend:
The frontend is also configured to run in Docker. When running the full setup with Docker Compose, the frontend will automatically be built and served from the container.

Access the app at http://localhost:3000.

### Folder Structure

Bhive-mutual-fund-app/
├── backend/               # Backend Node.js app
├── frontend/              # Frontend React app
├── docker-compose.yaml    # Docker Compose configuration for all services



### API Collection
The Bhive APIs.postman_collection.json is the postman collection, it containes all the API endpoints for the app. You can import it into Postman to easily test and interact with the APIs.