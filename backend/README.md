# Backend - Authentication API

This is the backend server for the authentication application using Express, Prisma, and JWT.

## Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
cd backend
./setup.sh
npm run dev
```

### Option 2: Manual Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file** in the backend directory:
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
```

3. **Generate Prisma Client:**
```bash
npm run prisma:generate
```

4. **Run database migrations:**
```bash
npm run prisma:migrate
```

5. **Start the server:**
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Troubleshooting

### Error: Environment variable not found: DATABASE_URL
**Solution:** Make sure you have created the `.env` file in the backend directory with the content shown above.

### Error: EADDRINUSE: address already in use :::5000
**Solution:** Port 5000 is already in use. Either:
- Stop the existing server process
- Or change the PORT in `.env` to a different port (e.g., 5001)

### Error: Prisma Client not generated
**Solution:** Run `npm run prisma:generate` to generate the Prisma Client.

### Error: Migration failed
**Solution:** Make sure the `.env` file exists and contains `DATABASE_URL="file:./dev.db"`

## API Endpoints

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current user information (requires JWT token)
- `GET /api/health` - Health check endpoint

## Example Request

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get User Info
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

