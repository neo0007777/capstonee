# Environment Variables Reference

This document lists all environment variables needed for deployment.

## Backend (Render)

### Required Environment Variables

```bash
# Node Environment
NODE_ENV=production

# Database Connection String
# Format: mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?sslmode=require
# Example (PlanetScale):
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/database?sslmode=require

# JWT Secret
# Generate with: openssl rand -base64 32
JWT_SECRET=your-generated-secret-key-here-min-32-characters

# Server Port (Render sets this automatically)
PORT=10000

# Frontend URL (for CORS)
# Your Vercel frontend URL (without trailing slash)
FRONTEND_URL=https://your-app.vercel.app
```

### How to Set in Render

1. Go to your Render service dashboard
2. Click on "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Your MySQL connection string
   - **Sync:** No (mark as secret)

5. Repeat for all variables

### Generating JWT Secret

```bash
# Generate a secure random secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Frontend (Vercel)

### Required Environment Variables

```bash
# Backend API URL
# Your Render backend URL (without trailing slash)
VITE_API_URL=https://your-backend.onrender.com
```

### How to Set in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Click "Add New"
4. Add variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.onrender.com`
   - **Environment:** Production, Preview, Development (select all)

5. Save and redeploy

---

## Local Development

### Backend (.env file in `backend/` directory)

```bash
# Database Connection (Local MySQL)
DATABASE_URL="mysql://root:password@localhost:3306/auth_db"

# JWT Secret (use any string for development)
JWT_SECRET="dev-secret-key-change-in-production"

# Server Port
PORT=5001

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000,http://localhost:5173"

# Node Environment
NODE_ENV="development"
```

### Frontend (.env file in `frontend/` directory)

```bash
# Backend API URL (Local)
VITE_API_URL="http://localhost:5001"
```

---

## Environment Variable Notes

### Backend Variables

1. **DATABASE_URL:**
   - Must be a valid MySQL connection string
   - Include SSL parameters for cloud databases
   - Format: `mysql://user:pass@host:port/db?sslmode=require`

2. **JWT_SECRET:**
   - Must be at least 32 characters long
   - Use a strong random string in production
   - Never commit this to version control

3. **FRONTEND_URL:**
   - Must match your Vercel frontend URL exactly
   - Include `https://` prefix
   - No trailing slash
   - Can include multiple URLs separated by commas

4. **PORT:**
   - Render sets this automatically (usually 10000)
   - Don't hardcode in production
   - Backend code uses `process.env.PORT || 5001`

### Frontend Variables

1. **VITE_API_URL:**
   - Must have `VITE_` prefix (required by Vite)
   - Must include `https://` prefix
   - No trailing slash
   - This is exposed to the browser, so use HTTPS

---

## Security Notes

### Never Commit These Files

- `.env` files (backend and frontend)
- Environment variables with secrets
- Database connection strings with passwords
- JWT secrets

### Use .gitignore

Make sure these are in `.gitignore`:

```
# Environment variables
.env
.env.local
.env.production
.env.development

# Secrets
*.key
*.pem
secrets/
```

### Production Best Practices

1. **Use strong secrets:**
   - Generate JWT_SECRET with `openssl rand -base64 32`
   - Use different secrets for each environment

2. **Use HTTPS:**
   - Always use `https://` in production URLs
   - Both Render and Vercel provide free SSL

3. **Rotate secrets:**
   - Change JWT_SECRET periodically
   - Update database passwords regularly

4. **Monitor access:**
   - Check Render logs for errors
   - Monitor Vercel deployments
   - Set up alerts for failed deployments

---

## Quick Reference

### Backend (Render)
```
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:port/db?sslmode=require
JWT_SECRET=<generated-secret>
PORT=10000
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

### Local Development
```
# Backend
DATABASE_URL=mysql://root:password@localhost:3306/auth_db
JWT_SECRET=dev-secret
PORT=5001
FRONTEND_URL=http://localhost:3000,http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:5001
```

---

## Troubleshooting

### Environment Variable Not Working

1. **Check spelling:** Variable names are case-sensitive
2. **Check prefix:** Frontend variables must have `VITE_` prefix
3. **Restart/Redeploy:** After adding env vars, restart services
4. **Check logs:** Look for errors in Render/Vercel logs

### CORS Errors

1. **Check FRONTEND_URL:** Must match Vercel URL exactly
2. **Check protocol:** Must use `https://` in production
3. **Check trailing slash:** Remove trailing slashes
4. **Check browser console:** Look for exact CORS error

### Database Connection Failed

1. **Check DATABASE_URL:** Verify connection string format
2. **Check SSL:** Cloud databases require SSL
3. **Check credentials:** Verify username and password
4. **Check network:** Verify database is accessible from Render

---

## Additional Resources

- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Prisma Connection Strings](https://www.prisma.io/docs/concepts/database-connectors/mysql)

