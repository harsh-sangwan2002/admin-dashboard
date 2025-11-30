import { createSlice } from "@reduxjs/toolkit";

// Load auth from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const storedRole = localStorage.getItem("role");

const initialState = {
    user: storedUser || null,
    token: storedToken || null,
    role: storedRole || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.user.role);
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;

            // Clear localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
