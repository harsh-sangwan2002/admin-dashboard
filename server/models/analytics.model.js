const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    signups: {
        type:
            Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    revenue: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
