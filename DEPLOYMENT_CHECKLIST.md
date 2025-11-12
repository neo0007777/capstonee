# Deployment Checklist

Use this checklist to ensure everything is set up correctly for deployment.

## ✅ Pre-Deployment

### Code Preparation
- [ ] Code is pushed to GitHub
- [ ] All changes are committed
- [ ] `.env` files are in `.gitignore`
- [ ] `node_modules` are in `.gitignore`
- [ ] No sensitive data in code

### Database Setup
- [ ] MySQL database created (PlanetScale or other)
- [ ] Database connection string ready
- [ ] Database credentials saved securely
- [ ] Database is accessible from Render

### Environment Variables Prepared
- [ ] JWT_SECRET generated (use: `openssl rand -base64 32`)
- [ ] DATABASE_URL ready (MySQL connection string)
- [ ] Frontend URL will be set after deployment
- [ ] All variables documented

---

## ✅ Backend Deployment (Render)

### Render Account
- [ ] Render account created
- [ ] GitHub account connected to Render
- [ ] Repository access granted

### Service Configuration
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start Command: `npm start`
- [ ] Plan: Free (or paid)

### Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (MySQL connection string)
- [ ] `JWT_SECRET` (generated secret)
- [ ] `PORT=10000`
- [ ] `FRONTEND_URL` (will update after frontend deploy)

### Deployment
- [ ] Service deployed successfully
- [ ] Build completed without errors
- [ ] Health check passed: `https://your-backend.onrender.com/api/health`
- [ ] API root accessible: `https://your-backend.onrender.com/`
- [ ] Backend URL saved: `https://your-backend.onrender.com`

---

## ✅ Frontend Deployment (Vercel)

### Vercel Account
- [ ] Vercel account created
- [ ] GitHub account connected to Vercel
- [ ] Repository access granted

### Project Configuration
- [ ] New project created
- [ ] Repository selected
- [ ] Framework Preset: Vite
- [ ] Root Directory set to `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variables Set
- [ ] `VITE_API_URL` (Render backend URL)
- [ ] Variable available for all environments

### Deployment
- [ ] Project deployed successfully
- [ ] Build completed without errors
- [ ] Frontend accessible: `https://your-app.vercel.app`
- [ ] Frontend URL saved: `https://your-app.vercel.app`

---

## ✅ Post-Deployment

### Backend Configuration
- [ ] `FRONTEND_URL` updated in Render (Vercel URL)
- [ ] Backend redeployed with new CORS settings
- [ ] CORS working correctly

### Frontend Configuration
- [ ] `VITE_API_URL` set correctly (Render URL)
- [ ] Frontend redeployed with correct API URL
- [ ] API calls working

### Testing
- [ ] Frontend loads correctly
- [ ] Sign up works
- [ ] Login works
- [ ] Dashboard accessible after login
- [ ] Logout works
- [ ] API calls successful (check browser console)
- [ ] No CORS errors
- [ ] No console errors

---

## ✅ Verification

### Backend
- [ ] Health check: `https://your-backend.onrender.com/api/health`
- [ ] API root: `https://your-backend.onrender.com/`
- [ ] Signup endpoint: `POST /api/auth/signup`
- [ ] Login endpoint: `POST /api/auth/login`
- [ ] Me endpoint: `GET /api/auth/me`

### Frontend
- [ ] Home page loads: `https://your-app.vercel.app`
- [ ] Login page loads: `https://your-app.vercel.app/login`
- [ ] Signup page loads: `https://your-app.vercel.app/signup`
- [ ] Dashboard loads after login: `https://your-app.vercel.app/dashboard`

### Integration
- [ ] Signup creates user in database
- [ ] Login returns JWT token
- [ ] Dashboard shows user information
- [ ] Logout clears token
- [ ] Protected routes work correctly

---

## ✅ Security

### Environment Variables
- [ ] All secrets in environment variables (not in code)
- [ ] `.env` files not committed to Git
- [ ] Strong JWT_SECRET used
- [ ] Database credentials secure

### HTTPS
- [ ] Backend uses HTTPS (Render)
- [ ] Frontend uses HTTPS (Vercel)
- [ ] All API calls use HTTPS
- [ ] No mixed content warnings

### CORS
- [ ] CORS configured correctly
- [ ] Only allowed origins can access API
- [ ] No wildcard CORS in production
- [ ] Credentials handled correctly

---

## ✅ Monitoring

### Logs
- [ ] Render logs accessible
- [ ] Vercel logs accessible
- [ ] No errors in logs
- [ ] Monitoring set up (optional)

### Performance
- [ ] Backend response time acceptable
- [ ] Frontend load time acceptable
- [ ] Database queries optimized
- [ ] No memory leaks

---

## ✅ Documentation

### Documentation Updated
- [ ] README.md updated
- [ ] Deployment guide complete
- [ ] Environment variables documented
- [ ] API endpoints documented

### Team Communication
- [ ] Team notified of deployment
- [ ] URLs shared with team
- [ ] Credentials shared securely
- [ ] Documentation accessible

---

## 🎉 Deployment Complete!

### Final Steps
- [ ] Save all URLs and credentials
- [ ] Test all functionality
- [ ] Monitor for issues
- [ ] Set up backups (optional)
- [ ] Set up custom domains (optional)

### URLs to Save
- **Backend URL:** `https://your-backend.onrender.com`
- **Frontend URL:** `https://your-app.vercel.app`
- **Health Check:** `https://your-backend.onrender.com/api/health`
- **Database:** (connection details)

### Next Steps
- [ ] Set up custom domains
- [ ] Set up monitoring
- [ ] Set up backups
- [ ] Optimize performance
- [ ] Add features
- [ ] Scale as needed

---

## 🐛 Troubleshooting

If something doesn't work:

1. **Check logs:**
   - Render: Dashboard → Service → Logs
   - Vercel: Dashboard → Project → Deployments → Logs

2. **Check environment variables:**
   - Verify all variables are set correctly
   - Check spelling and case sensitivity
   - Restart services after changes

3. **Check CORS:**
   - Verify FRONTEND_URL matches Vercel URL exactly
   - Check browser console for CORS errors
   - Verify protocol (https://)

4. **Check database:**
   - Verify DATABASE_URL is correct
   - Check database is accessible
   - Verify migrations ran successfully

5. **Check API calls:**
   - Verify VITE_API_URL is set correctly
   - Check browser Network tab
   - Verify backend is running

For detailed troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting).

---

**Congratulations! Your app is deployed! 🚀**

