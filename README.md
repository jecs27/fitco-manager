# fitco-manager

# Fitco Manager Backend

A NestJS-based backend service for the Fitco Manager application.

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- JWT Authentication
- MySQL

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

## Project Setup

1. Install dependencies:```bash
npm install
```

2. Environment Configuration:
Create a `.env` file in the root directory with the following variables:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=fitco_manager

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=12h
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode (recommended for development)
npm run start:dev

# Production mode
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # Users module
├── clients/        # Clients module
├── meals/          # Meals module
├── meal-plans/     # Meal plans module
└── common/         # Shared resources
```

## Features

- JWT-based authentication
- User management
- Client management
- Meal management
- Meal planning by client
- Secure API endpoints

## Development Guidelines

- Follow the ESLint configuration provided in `.eslintrc.js`
- Use Prettier for code formatting (configuration in `.prettierrc`)
- Write unit tests for new features
- Follow NestJS best practices and architectural patterns

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License.
