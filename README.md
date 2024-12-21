Git Repository Link - [Bhive-mutual-fund-app](https://github.com/prabal-007/Bhive-mutual-fund-app)

# Prerequisites:
Node.js (v14.x or later)
PostgreSQL (or use Docker)
Docker (for containerized setup)
Prisma CLI (npm install -g prisma)

# Integration with RapidAPI:
Obtain an API key from [RapidAPI](https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav).
Add the key to the .env file as RAPIDAPI_KEY.

## A. Non-Docker Setup:

Clone the Repository:

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

Install Dependencies:

```bash
pip install foobar
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
git clone https://github.com/username/repository-name.git
cd repository-name
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

Access the app at http://localhost:3000.