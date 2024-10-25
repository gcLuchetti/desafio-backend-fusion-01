# NestJS Application - Docker Setup

This is a NestJS application configured to run with PostgreSQL using Docker and Docker Compose.

## Prerequisites

Ensure you have the following installed:

- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose**: Installed along with Docker.

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Environment Variables
Create a .env file in the root of your project with the following content:

```bash
# Node environment - dev | prod
NODE_ENV=dev

# PostgreSQL configuration
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdatabase

# JWT Secret (if applicable)
JWT_SECRET=your_jwt_secret
```

### 3. Docker Setup
This project is fully containerized using Docker. It includes:

- NestJS Application
- PostgreSQL

### 4. Build and Run with Docker Compose
To build and run the application with Docker Compose, run the following command:

```bash
docker-compose -f docker-compose.yml up --build
```

This will:

- Build the Docker images for the NestJS app and PostgreSQL.
- Start both containers and link them.

### 5. Access the Application

Once the containers are running, you can access the NestJS application at:

```bash
http://localhost:3000/swagger
```
