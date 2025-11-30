import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white/10 backdrop-blur-xl border-b border-white/20
                        p-4 flex items-center justify-between shadow-lg">

            <h1 className="text-white text-xl font-bold tracking-wide">
                User Dashboard
            </h1>

            <div className="relative">

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 focus:outline-none"
                >
                    <span className="text-white text-sm hidden sm:block">
                        {user?.name || "User"}
                    </span>

                    <img
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user?.name || "user"}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-white/20 shadow-md cursor-pointer"
                    />
                </button>

                {open && (
                    <div
                        className="absolute right-0 top-12 
                                   bg-white/20 backdrop-blur-xl 
                                   border border-white/10 
                                   rounded-lg shadow-xl 
                                   p-3 w-48 
                                   animate-fadeIn 
                                   overflow-hidden"
                    >
                        <p className="text-white text-sm wrap-break-words mb-2">
                            {user?.email}
                        </p>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 
                                       text-red-300 font-semibold rounded-md 
                                       hover:bg-white/10 transition"
                            style={{ cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
