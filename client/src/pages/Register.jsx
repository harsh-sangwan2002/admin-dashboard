import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axiosInstance.post("/auth/register", form);

            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Registration failed. Please try again.";

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
                    Create Account
                </h2>

                {/* Subtitle */}
                <p className="text-center text-slate-300 text-sm mb-2">
                    Register to get access to your dashboard
                </p>

                {/* ERROR ALERT */}
                {error && (
                    <div className="bg-red-500/20 text-red-300 border border-red-500/30 
                                    p-3 rounded-lg text-center text-sm animate-fadeIn">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className="text-slate-200 text-sm mb-1 block">Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full p-3 rounded-lg bg-white/20 text-white
                                   placeholder-slate-300 outline-none border border-white/20
                                   focus:border-indigo-400 transition"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                </div>

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
                                   focus:border-purple-400 transition"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                </div>

                {/* Role Selector */}
                <div>
                    <label className="text-slate-200 text-sm mb-1 block">Role</label>
                    <select
                        className="w-full p-3 rounded-lg bg-white/20 text-white
                                   outline-none border border-white/20
                                   focus:border-indigo-400 transition cursor-pointer"
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                        }
                    >
                        <option value="user" className="text-black">User</option>
                        <option value="admin" className="text-black">Admin</option>
                    </select>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg 
                               bg-linear-to-r from-indigo-500 to-purple-500 
                               text-white font-semibold tracking-wide
                               shadow-lg hover:opacity-90 transition active:scale-95"
                >
                    Register
                </button>

                {/* Login Link */}
                <p className="text-center text-slate-300 text-sm">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-indigo-300 cursor-pointer hover:text-indigo-200"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
