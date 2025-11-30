// src/controllers/authController.js
const User = require("../models/user.model");
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require("../utils/tokenUtils");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // maxAge is set via refresh token expiration (not necessary here)
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password required" });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already in use" });

        const user = new User({ name, email, password, role });
        await user.save();

        const payload = { id: user._id, role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // save refresh token in DB (optional, safer to allow revocation)
        user.refreshToken = refreshToken;
        await user.save();

        res
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(201)
            .json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token: accessToken,
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const payload = { id: user._id, role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // update refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();

        res
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token: accessToken,
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token provided" });

        const payload = verifyRefreshToken(token);

        // optional: check token matches the one in DB
        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== token)
            return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = signAccessToken({ id: user._id, role: user.role });
        const newRefreshToken = signRefreshToken({ id: user._id, role: user.role });

        user.refreshToken = newRefreshToken;
        await user.save();

        res
            .cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                token: newAccessToken,
            });
    } catch (err) {
        console.error("Refresh error:", err.message || err);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!token) {
            // clear cookie anyway
            res.clearCookie("refreshToken", cookieOptions);
            return res.sendStatus(204);
        }

        // Try to decode to find user and remove stored refresh token
        try {
            const payload = verifyRefreshToken(token);
            await User.findByIdAndUpdate(payload.id, { $unset: { refreshToken: "" } });
        } catch {
            // ignore
        }

        res.clearCookie("refreshToken", cookieOptions);
        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};
