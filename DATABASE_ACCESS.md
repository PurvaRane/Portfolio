# How to Access Your Portfolio Database

This guide explains how to view and manage the data collected by your portfolio (analytics and reviews).

## 🗄️ Database Overview

Your portfolio uses **MongoDB Atlas** (cloud database) to store two types of data:

1. **Analytics** - Portfolio page views, visitor details
2. **Reviews** - Visitor recommendations and reviews

---

## 📊 Where to See Your Data

### Option 1: MongoDB Atlas Dashboard (Recommended)

This is the easiest way to view all your data with a visual interface.

#### Step-by-Step Instructions:

1. **Login to MongoDB Atlas**

   - Go to https://cloud.mongodb.com/
   - Sign in with your account

2. **Navigate to Your Database**

   - Click on **"Database"** in the left sidebar
   - Find your cluster (likely named "Cluster0" if you created a free tier)
   - Click **"Browse Collections"** button

3. **View Your Collections**

   You'll see two collections:

   **📈 `analytics` Collection**

   - Shows all portfolio visits
   - Fields: page, timestamp, userAgent, screenWidth, screenHeight, ipAddress, referrer
   - Sorted by most recent first

   **⭐ `reviews` Collection**

   - Shows all submitted reviews
   - Fields: name, role, message, rating, approved, timestamp
   - Pending reviews have `approved: false`

4. **Filter and Search**

   - Click on a collection name to view all documents
   - Use the search bar to find specific entries
   - Apply filters (e.g., show only approved reviews)

5. **Export Data**
   - Click the **"Export Collection"** button
   - Choose format: JSON or CSV
   - Download for analysis in Excel, Google Sheets, etc.

---

### Option 2: Using API Endpoints (Technical)

Your backend exposes several endpoints to access data programmatically:

#### Analytics Endpoints

**Get Analytics Summary**

```bash
# In your browser or using curl:
http://localhost:5000/api/analytics/summary

# Returns:
{
  "success": true,
  "data": {
    "totalViews": 150,
    "todayViews": 12,
    "recentViews": [...]
  }
}
```

#### Review Endpoints

**Get All Reviews (Including Pending)**

```bash
http://localhost:5000/api/reviews/all

# Returns:
{
  "success": true,
  "data": [...all reviews...],
  "stats": {
    "total": 25,
    "approved": 18,
    "pending": 7
  }
}
```

**Get Only Approved Reviews**

```bash
http://localhost:5000/api/reviews

# Returns only approved reviews (what visitors see)
```

---

## ✅ How to Approve Reviews

Reviews are submitted with `approved: false` by default. Here's how to approve them:

### Method 1: MongoDB Atlas Dashboard (Easiest)

1. Go to MongoDB Atlas → Browse Collections → `reviews`
2. Find the review you want to approve
3. Click the **Edit** button (pencil icon)
4. Change `approved: false` to `approved: true`
5. Click **Update**
6. The review will now appear on your portfolio!

### Method 2: MongoDB Compass (Desktop App)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your MongoDB URI
3. Navigate to your database → `reviews` collection
4. Double-click on a document
5. Change `approved: false` to `approved: true`
6. Click **Update**

### Method 3: Using MongoDB Shell (Advanced)

```javascript
// Connect to your database
use portfolio

// Approve a specific review by ID
db.reviews.updateOne(
  { _id: ObjectId("review_id_here") },
  { $set: { approved: true } }
)

// Approve all pending reviews at once
db.reviews.updateMany(
  { approved: false },
  { $set: { approved: true } }
)
```

---

## 📈 Understanding Your Analytics Data

### Key Metrics to Track:

1. **Total Views**: Overall portfolio visits
2. **Today's Views**: Daily traffic
3. **Popular Times**: Check timestamps to see when people visit
4. **Referrers**: See where visitors come from (LinkedIn, GitHub, direct, etc.)
5. **Device Types**: Screen sizes tell you if users are on mobile/desktop

### Example Query in MongoDB:

```javascript
// Count visits by date
db.analytics.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
      count: { $sum: 1 },
    },
  },
  { $sort: { _id: -1 } },
]);
```

---

## 🔐 Security Best Practices

1. **Never share your MongoDB URI publicly**

   - Keep it in `.env` files only
   - Don't commit `.env` to GitHub

2. **Restrict Database Access**

   - In MongoDB Atlas, go to **Database Access**
   - Ensure only your IP addresses can access the database
   - Or use strong passwords for database users

3. **Regular Backups**
   - MongoDB Atlas provides automatic backups
   - Check **Backup** tab in your cluster settings

---

## 📱 Quick Access Checklist

- [ ] Bookmark MongoDB Atlas: https://cloud.mongodb.com/
- [ ] Check analytics daily/weekly
- [ ] Review and approve new reviews regularly
- [ ] Export data monthly for deeper analysis
- [ ] Monitor database size (free tier: 512MB limit)

---

## 🆘 Troubleshooting

**Can't see data in MongoDB Atlas?**

- Ensure your backend server is running
- Check that `MONGODB_URI` is correctly set in `server/.env`
- Verify database connection: visit `http://localhost:5000/api/health`

**Reviews not appearing on portfolio?**

- Check if reviews are approved in the database
- Only reviews with `approved: true` show on the website

**Need to delete spam reviews?**

- In MongoDB Atlas, click on the review document
- Click the **trash icon** to delete it

---

## 📧 Need Help?

If you encounter issues:

1. Check backend server logs for errors
2. Verify MongoDB connection status
3. Ensure `.env` variables are correctly set
4. Check browser console for frontend errors

---

## 🎯 Summary

**To view your data:**

1. Go to https://cloud.mongodb.com/
2. Click "Browse Collections"
3. View `analytics` and `reviews` collections

**To approve reviews:**

1. Open `reviews` collection
2. Edit the document
3. Set `approved: true`
4. Save changes
