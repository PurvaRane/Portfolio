# Deployment Instructions

## 1. Backend (Render) -> MongoDB

To ensure your backend can store reviews, you must connect it to MongoDB.

**On Render Dashboard:**

1. Go to your Web Service (Backend).
2. Click **Environment**.
3. Add the following Environment Variable:
   - Key: `MONGODB_URI`
   - Value: `your_mongodb_connection_string` (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)

> **Note:** If you see `EADDRINUSE` errors in the logs, Render usually manages `PORT` automatically. You do NOT need to set `PORT` manually on Render, but if you do, set it to `5000` or whatever port Render expects.

## 2. Frontend (Vercel) -> Backend

To ensure your frontend can talk to your backend, you must tell it where the backend lives.

**On Vercel Dashboard:**

1. Go to your Project (Frontend).
2. Click **Settings** > **Environment Variables**.
3. Add the following Environment Variable:

   - Key: `VITE_API_URL`
   - Value: `https://your-backend-service-name.onrender.com` (Replace with your actual Render URL)
   - **Important:** Do NOT add a trailing slash `/`.

4. **Redeploy** your frontend for the changes to take effect.

## 3. Verify Connection

open your website and check the **Console** (Right Click -> Inspect -> Console).

- When you submit a review, you should see: `🚀 Submitting review to: https://.../api/reviews`
- If you see `❌ VITE_API_URL is not defined`, you missed Step 2.
