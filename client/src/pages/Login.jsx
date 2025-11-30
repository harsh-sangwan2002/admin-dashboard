import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear previous errors

        try {
            const res = await axiosInstance.post("/auth/login", form);

            dispatch(loginSuccess(res.data));

            if (res.data.user.role === "admin") navigate("/admin");
            else navigate("/");
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Login failed. Please try again.";

            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900 
                        p-4">

            {/* Glassmorphic Card */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl 
                           p-8 rounded-2xl shadow-2xl border border-white/20 
                           space-y-6 animate-fadeIn"
            >
                {/* Title */}
                <h2 className="text-4xl font-bold text-center text-white tracking-wide">
                    Welcome Back
                </h2>

                {/* Subtitle */}
                <p className="text-center text-slate-300 text-sm mb-2">
                    Login to your admin dashboard
                </p>

                {/* ERROR ALERT */}
                {error && (
                    <div className="bg-red-500/20 text-red-300 border border-red-500/30 
                                    p-3 rounded-lg text-center text-sm animate-fadeIn">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label className="text-slate-200 text-sm mb-1 block">Email</label>
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 rounded-lg bg-white/20 text-white
                                   placeholder-slate-300 outline-none border border-white/20
                                   focus:border-indigo-400 transition"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="text-slate-200 text-sm mb-1 block">Password</label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-3 rounded-lg bg-white/20 text-white
                                   placeholder-slate-300 outline-none border border-white/20
                                   focus:border-indigo-400 transition"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg 
                               bg-linear-to-r from-indigo-500 to-purple-500 
                               text-white font-semibold tracking-wide
                               shadow-lg hover:opacity-90 transition active:scale-95"
                >
                    Login
                </button>

                {/* Extra */}
                <p className="text-center text-slate-300 text-sm">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-indigo-300 cursor-pointer hover:text-indigo-200"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}
