# Complete Deployment Guide

This guide will walk you through deploying your authentication app to **Render (Backend)** and **Vercel (Frontend)** from scratch.

## Prerequisites

- GitHub account
- Render account (sign up at https://render.com)
- Vercel account (sign up at https://vercel.com)
- MySQL database (we'll use Render's free MySQL database)

## Table of Contents

1. [Pre-Deployment Setup](#pre-deployment-setup)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
5. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Setup

### Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Create a new repository (e.g., `auth-app`)
   - **Do NOT** initialize with README, .gitignore, or license

3. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/auth-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Prepare Environment Variables

You'll need these environment variables:

**Backend (Render):**
- `DATABASE_URL` - MySQL connection string (from Render database)
- `JWT_SECRET` - A strong random string (generate with: `openssl rand -base64 32`)
- `PORT` - Will be set automatically by Render (default: 10000)
- `FRONTEND_URL` - Your Vercel frontend URL (set after frontend deployment)
- `NODE_ENV` - Set to `production`

**Frontend (Vercel):**
- `VITE_API_URL` - Your Render backend URL (set after backend deployment)

---

## Backend Deployment (Render)

### Step 1: Create MySQL Database on Render

1. **Login to Render:**
   - Go to https://render.com
   - Sign up or log in

2. **Create a MySQL Database:**
   - Click "New +" → "PostgreSQL" (Render offers PostgreSQL, but we can use MySQL via external service)
   - **OR** Use a free MySQL service like:
     - **PlanetScale** (recommended for MySQL)
     - **Railway** (offers MySQL)
     - **Aiven** (offers MySQL)

   **For this guide, we'll use PlanetScale (Free MySQL):**
   
   a. Go to https://planetscale.com
   b. Sign up for free account
   c. Create a new database
   d. Go to "Connect" → Copy the connection string
   e. The connection string looks like: `mysql://username:password@host:port/database?sslmode=require`

### Step 2: Deploy Backend to Render

1. **Create a New Web Service:**
   - In Render dashboard, click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your code

2. **Configure the Service:**
   - **Name:** `auth-backend` (or any name you prefer)
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend` (important!)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you need more resources)

3. **Set Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   DATABASE_URL=mysql://username:password@host:port/database?sslmode=require
   JWT_SECRET=your-generated-secret-key-here
   PORT=10000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
   
   **Note:** 
   - Replace `DATABASE_URL` with your actual MySQL connection string
   - Generate `JWT_SECRET` using: `openssl rand -base64 32`
   - `FRONTEND_URL` will be set after frontend deployment (you can update it later)

4. **Deploy:**
   - Click "Create Web Service"
   - Render will start building and deploying your backend
   - Wait for deployment to complete (usually 2-5 minutes)
   - Note your backend URL (e.g., `https://auth-backend.onrender.com`)

### Step 3: Verify Backend Deployment

1. **Check Health Endpoint:**
   - Open: `https://your-backend.onrender.com/api/health`
   - You should see: `{"message":"Server is running"}`

2. **Check API Root:**
   - Open: `https://your-backend.onrender.com/`
   - You should see API information

### Step 4: Update Frontend URL in Render

After deploying the frontend (next step), come back and update the `FRONTEND_URL` environment variable in Render to your Vercel URL.

---

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Login to Vercel:**
   - Go to https://vercel.com
   - Sign up or log in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (click "Edit" and set to `frontend`)
   - **Build Command:** `npm run build` (should be auto-detected)
   - **Output Directory:** `dist` (should be auto-detected)
   - **Install Command:** `npm install` (should be auto-detected)

4. **Set Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
   
   **Important:** 
   - Replace `your-backend.onrender.com` with your actual Render backend URL
   - Make sure to include `https://` prefix
   - Do NOT include trailing slash

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - Wait for deployment to complete (usually 1-2 minutes)
   - Note your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 2: Verify Frontend Deployment

1. **Visit Your Frontend URL:**
   - Open: `https://your-app.vercel.app`
   - You should see the login page

2. **Test Authentication:**
   - Try signing up with a new account
   - Try logging in
   - Check if it connects to your backend

### Step 3: Update Backend CORS

1. **Go back to Render Dashboard:**
   - Open your backend service
   - Go to "Environment" tab
   - Update `FRONTEND_URL` to your Vercel URL:
     ```
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Click "Save Changes"
   - Render will automatically redeploy

---

## Connecting Frontend to Backend

### Update Environment Variables

After both deployments are complete:

1. **In Vercel (Frontend):**
   - Go to your project settings
   - Update `VITE_API_URL` to your Render backend URL
   - Redeploy if needed (Vercel usually auto-redeploys on env var changes)

2. **In Render (Backend):**
   - Update `FRONTEND_URL` to your Vercel frontend URL
   - Save changes (auto-redeploys)

### Verify Connection

1. **Open Browser Developer Tools:**
   - Open your Vercel frontend URL
   - Press F12 to open DevTools
   - Go to "Network" tab

2. **Test API Calls:**
   - Try to sign up or log in
   - Check if API requests are going to your Render backend
   - Verify responses are successful

---

## Troubleshooting

### Backend Issues

**Problem: Build fails with Prisma error**
- **Solution:** Make sure `DATABASE_URL` is set correctly in Render environment variables
- Check that Prisma schema is correct
- Verify database is accessible from Render

**Problem: Database connection failed**
- **Solution:** 
  - Verify `DATABASE_URL` is correct
  - Check if database allows connections from Render's IPs
  - For PlanetScale, make sure SSL is enabled in connection string

**Problem: CORS errors**
- **Solution:** 
  - Verify `FRONTEND_URL` is set correctly in Render
  - Make sure it matches your Vercel URL exactly (including `https://`)
  - Check browser console for exact CORS error message

**Problem: Health check failing**
- **Solution:** 
  - Verify `/api/health` endpoint exists
  - Check Render logs for errors
  - Make sure server is listening on correct port

### Frontend Issues

**Problem: API calls failing**
- **Solution:** 
  - Verify `VITE_API_URL` is set correctly in Vercel
  - Make sure it includes `https://` prefix
  - Check browser console for error messages
  - Verify backend is running and accessible

**Problem: Environment variable not working**
- **Solution:** 
  - Vite requires `VITE_` prefix for environment variables
  - After updating env vars in Vercel, redeploy the frontend
  - Clear browser cache and hard refresh

**Problem: Build fails**
- **Solution:** 
  - Check Vercel build logs for errors
  - Verify all dependencies are in `package.json`
  - Make sure `vite.config.js` is correct

### Database Issues

**Problem: Migrations not running**
- **Solution:** 
  - Verify `DATABASE_URL` is correct
  - Check Render build logs for migration errors
  - Manually run migrations if needed: `npx prisma migrate deploy`

**Problem: Tables not created**
- **Solution:** 
  - Check if migrations ran successfully
  - Verify Prisma schema is correct
  - Check database directly to see if tables exist

---

## Quick Reference

### Render Backend Environment Variables
```
NODE_ENV=production
DATABASE_URL=mysql://user:pass@host:port/db?sslmode=require
JWT_SECRET=your-secret-key
PORT=10000
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel Frontend Environment Variables
```
VITE_API_URL=https://your-backend.onrender.com
```

### Important URLs to Save
- **Backend URL:** `https://your-backend.onrender.com`
- **Frontend URL:** `https://your-app.vercel.app`
- **Health Check:** `https://your-backend.onrender.com/api/health`

---

## Next Steps

1. **Set up Custom Domain (Optional):**
   - Render: Add custom domain in service settings
   - Vercel: Add custom domain in project settings

2. **Enable HTTPS (Automatic):**
   - Both Render and Vercel provide free SSL certificates
   - HTTPS is enabled by default

3. **Monitor Your Application:**
   - Render: Check logs in dashboard
   - Vercel: Check deployment logs and analytics

4. **Set up Database Backups:**
   - PlanetScale: Automatic backups (paid plans)
   - Render: Manual backups or use external backup service

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Check Render logs: Dashboard → Your Service → Logs
3. Check Vercel logs: Dashboard → Your Project → Deployments → Logs
4. Check browser console for frontend errors
5. Verify all environment variables are set correctly

---

## Summary

✅ **Backend (Render):**
- Deploy web service
- Set up MySQL database (PlanetScale recommended)
- Configure environment variables
- Deploy and verify

✅ **Frontend (Vercel):**
- Import GitHub repository
- Configure build settings
- Set environment variables
- Deploy and verify

✅ **Connect:**
- Update `VITE_API_URL` in Vercel
- Update `FRONTEND_URL` in Render
- Test authentication flow

Your app should now be live! 🚀

