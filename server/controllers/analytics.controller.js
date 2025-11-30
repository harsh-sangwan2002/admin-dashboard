const Analytics = require("../models/analytics.model");

// KPI DATA (Top cards)
exports.getKpiData = async (req, res) => {
    try {
        const totalUsers = await req.app.locals.dbUserCount(); // custom helper (see below)
        const activeUsers = await req.app.locals.dbActiveUsers();
        const totalSales = await req.app.locals.dbTotalSales();
        const growth = await req.app.locals.dbGrowthPercent();

        res.json({
            activeUsers,
            totalUsers,
            totalSales,
            revenueGrowth: growth,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Analytics error" });
    }
};

// WEEKLY SIGNUPS CHART
exports.getWeeklySignups = async (req, res) => {
    try {
        const last7 = await Analytics.find({})
            .sort({ date: -1 })
            .limit(7);

        const formatted = last7
            .reverse()
            .map((d) => ({
                name: new Date(d.date).toLocaleDateString("en-US", {
                    weekday: "short",
                }),
                value: d.signups,
            }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: "Error fetching signups" });
    }
};

// MONTHLY SALES CHART
exports.getMonthlySales = async (req, res) => {
    try {
        const data = await Analytics.find({})
            .sort({ date: -1 })
            .limit(12);

        const formatted = data.reverse().map((d) => ({
            name: d.date.toLocaleDateString("en-US", { month: "short" }),
            value: Number(d.sales),
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: "Error fetching sales" });
    }
};

exports.insertSeedData = async (req, res) => {
    try {
        // Clear old data
        await Analytics.deleteMany();

        // Insert 30 days of analytics data
        const sample = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            sample.push({
                date,
                signups: Math.floor(Math.random() * 100) + 20,
                sales: Math.floor(Math.random() * 5000) + 1000,
                revenue: Math.floor(Math.random() * 8000) + 2000
            });
        }

        await Analytics.insertMany(sample);

        return res.json({
            message: "Sample analytics data inserted successfully!",
            count: sample.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Seeder error" });
    }
};