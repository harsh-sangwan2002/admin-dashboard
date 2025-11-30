const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/analytics.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// admin-only analytics
router.get("/kpi", authMiddleware, roleMiddleware(["admin"]), ctrl.getKpiData)
    .get("/signups", authMiddleware, roleMiddleware(["admin"]), ctrl.getWeeklySignups)
    .get("/sales", authMiddleware, roleMiddleware(["admin"]), ctrl.getMonthlySales)
    .get("/seed", ctrl.insertSeedData);


module.exports = router;
