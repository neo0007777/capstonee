# Quick Deployment Guide

This is a quick reference guide for deploying your app to Render (Backend) and Vercel (Frontend).

## Prerequisites

- Code pushed to GitHub
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- MySQL database (PlanetScale recommended)

---

## Step 1: Deploy Backend to Render

### 1.1 Create MySQL Database (PlanetScale)

1. Go to https://planetscale.com and sign up
2. Create a new database
3. Copy the connection string from "Connect" → "Prisma"
4. Connection string format: `mysql://username:password@host:port/database?sslmode=require`

### 1.2 Deploy to Render

1. **Login to Render:** https://render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub repository**
4. **Configure:**
   - **Name:** `auth-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. **Set Environment Variables:**
   ```
   NODE_ENV=production
   DATABASE_URL=mysql://user:pass@host:port/db?sslmode=require
   JWT_SECRET=<generate with: openssl rand -base64 32>
   PORT=10000
   FRONTEND_URL=https://your-app.vercel.app (update after frontend deploy)
   ```

6. **Deploy and wait for completion**
7. **Note your backend URL:** `https://auth-backend.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Deploy to Vercel

1. **Login to Vercel:** https://vercel.com
2. **Click "Add New..." → "Project"**
3. **Import GitHub repository**
4. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Set Environment Variables:**
   ```
   VITE_API_URL=https://auth-backend.onrender.com
   ```

6. **Deploy and wait for completion**
7. **Note your frontend URL:** `https://your-app.vercel.app`

---

## Step 3: Connect Frontend to Backend

### 3.1 Update Backend CORS

1. **Go to Render Dashboard**
2. **Open your backend service**
3. **Go to "Environment" tab**
4. **Update `FRONTEND_URL`:** `https://your-app.vercel.app`
5. **Save changes** (auto-redeploys)

### 3.2 Verify Connection

1. **Visit your Vercel frontend URL**
2. **Try to sign up/login**
3. **Check browser console for errors**
4. **Verify API calls are successful**

---

## Environment Variables Reference

### Backend (Render)
```
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:port/db?sslmode=require
JWT_SECRET=<random-32-char-string>
PORT=10000
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://auth-backend.onrender.com
```

---

## Troubleshooting

### Backend Issues
- **Build fails:** Check `DATABASE_URL` is correct
- **CORS errors:** Verify `FRONTEND_URL` matches Vercel URL exactly
- **Database connection fails:** Check MySQL connection string

### Frontend Issues
- **API calls fail:** Verify `VITE_API_URL` is set correctly
- **Build fails:** Check all dependencies are in `package.json`
- **Environment variable not working:** Make sure it has `VITE_` prefix

---

## Quick Commands

### Generate JWT Secret
```bash
openssl rand -base64 32
```

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### Test API
```bash
curl https://your-backend.onrender.com/
```

---

## URLs to Save

- **Backend URL:** `https://auth-backend.onrender.com`
- **Frontend URL:** `https://your-app.vercel.app`
- **Health Check:** `https://auth-backend.onrender.com/api/health`

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Update environment variables
4. ✅ Test authentication flow
5. ✅ Set up custom domains (optional)

Your app is now live! 🚀

