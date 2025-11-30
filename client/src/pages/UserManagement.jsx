import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await axiosInstance.get("/admin/users");
        setUsers(res.data);
    };

    const updateRole = async (id, role) => {
        await axiosInstance.put(`/admin/users/${id}`, { role });
        fetchUsers();
    };

    const deleteUser = async (id) => {
        await axiosInstance.delete(`/admin/users/${id}`);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen p-10 text-white bg-linear-to-br
                        from-slate-900 via-indigo-900 to-purple-900">

            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            <table className="w-full bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
                <thead className="bg-white/20">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u._id} className="border-b border-white/10">
                            <td className="p-3">{u.name}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3 capitalize">{u.role}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    onClick={() => updateRole(u._id, u.role === "admin" ? "user" : "admin")}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                                >
                                    Toggle Role
                                </button>
                                <button
                                    onClick={() => deleteUser(u._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
