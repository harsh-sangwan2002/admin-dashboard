const router = require("express").Router();
const User = require("../models/user.model");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Get all users
router.get("/users", auth, role(["admin"]), async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Update user role
router.put("/users/:id", auth, role(["admin"]), async (req, res) => {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
    );
    res.json(updated);
});

// Delete user
router.delete("/users/:id", auth, role(["admin"]), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
});

module.exports = router;
