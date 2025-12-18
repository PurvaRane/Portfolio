# Backend Setup Instructions

This directory contains the backend server for portfolio analytics tracking.

## Setup

1. **Install Dependencies**

   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
3. **Set up MongoDB (Optional but Recommended)**

   a. Create a free MongoDB Atlas account:

   - Go to https://cloud.mongodb.com/
   - Sign up for free
   - Create a new cluster (free tier is fine)

   b. Get your connection string:

   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

   c. Update `.env` file:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

4. **Run the Server**

   For development (with auto-reload):

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

5. **Verify Server is Running**
   - Open http://localhost:5000/api/health
   - You should see: `{"status":"ok","message":"Portfolio backend is running","dbConnected":true}`

## Endpoints

### `GET /api/health`

Health check endpoint to verify server is running.

### `POST /api/analytics/view`

Track a page view. Send JSON body:

```json
{
  "page": "home",
  "userAgent": "...",
  "referrer": "...",
  "screenWidth": 1920,
  "screenHeight": 1080
}
```

### `GET /api/analytics/summary`

Get analytics summary (total views, today's views, recent views).

## Deployment

### Option 1: Railway

1. Go to https://railway.app/
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your portfolio repository
5. Add environment variables in Railway dashboard
6. Deploy!

### Option 2: Render

1. Go to https://render.com/
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set build command: `cd server && npm install`
6. Set start command: `cd server && npm start`
7. Add environment variables
8. Deploy!

### Option 3: Vercel

1. Add `vercel.json` configuration for serverless functions
2. Deploy via Vercel CLI or GitHub integration

## Notes

- The server will run even if MongoDB is not connected (it will log a warning)
- Analytics will only work when MongoDB is properly configured
- Make sure to update `FRONTEND_URL` in backend `.env` when deploying
- Update `VITE_API_URL` in frontend `.env.local` to point to your deployed backend
