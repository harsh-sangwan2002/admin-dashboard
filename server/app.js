// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const analyticsRoutes = require("./routes/analytics.route");
const adminRoutes = require("./routes/admin.route");

const app = express();

dotenv.config();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS — allow your frontend origin
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);


const User = require("./models/user.model");
const Analytics = require("./models/analytics.model");
// Helper functions accessible everywhere
app.locals.dbUserCount = async () => User.countDocuments();

app.locals.dbActiveUsers = async () => {
    // count users logged-in in the last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return User.countDocuments({ updatedAt: { $gte: since } });
};

app.locals.dbTotalSales = async () => {
    const data = await Analytics.aggregate([
        { $group: { _id: null, sum: { $sum: "$sales" } } }
    ]);
    return data[0]?.sum || 0;
};

app.locals.dbGrowthPercent = async () => {
    const lastTwo = await Analytics.find().sort({ date: -1 }).limit(2);
    if (lastTwo.length < 2) return 0;

    const prev = lastTwo[1].revenue;
    const curr = lastTwo[0].revenue;
    return prev === 0 ? 100 : (((curr - prev) / prev) * 100).toFixed(1);
};


// example protected route
const authMiddleware = require("./middlewares/auth.middleware");
const roleMiddleware = require("./middlewares/role.middleware");
app.get(
    "/api/me",
    authMiddleware,
    async (req, res) => {
        // minimal example — in real app query DB for user details
        res.json({
            id: req.user.id,
            role: req.user.role,
        });
    }
);

// connect to DB then start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
