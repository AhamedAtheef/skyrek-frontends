import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/${page}/${limit}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );

                // Ensure users is an array
                const usersData = Array.isArray(res.data.users) ? res.data.users : [res.data];
                setUsers(usersData);
                setTotalPages(res.data.totalPages || 1);
                console.log(res.data);
                toast.success("Users fetched successfully.");
            } catch (error) {
                console.error("Failed to fetch users:", error.response || error);
                toast.error(
                    error.response?.status === 401
                        ? "Unauthorized. Please login."
                        : "Failed to fetch users"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);
    const toggleBlockUser = async (useremail, currentStatus) => {
        try {
            // Send PUT request with the new status
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${useremail}`,
                { isBlocked: !currentStatus }, // send the new value
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );


            setUsers((prev) =>
                prev.map((user) =>
                    user.email === useremail ? { ...user, isBlocked: !currentStatus } : user
                )
            );

            toast.success(
                !currentStatus ? "User blocked successfully." : "User unblocked successfully."
            );
        } catch (error) {
            console.error("Failed to toggle block user:", error.response || error);
            toast.error(
                error.response?.status === 401
                    ? "Unauthorized. Please login."
                    : "Failed to update user status"
            );
        }
    };
    const toggleEmailVerified = async (useremail, currentStatus) => {
        try {
            // Send PUT request with the new status
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${useremail}`,
                { isEmailVerified: !currentStatus }, // send the new value
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );


            setUsers((prev) =>
                prev.map((user) =>
                    user.email === useremail ? { ...user, isEmailVerified: !currentStatus } : user
                )
            );

            toast.success(
                !currentStatus ? "Verified successfully." : "Unverified successfully."
            );
        } catch (error) {
            console.error("Failed to toggle emailverified :", error.response || error);
            toast.error(
                error.response?.status === 401
                    ? "Unauthorized. Please login."
                    : "Failed to update user status"
            );
        }
    };

    if (loading)
        return <p className="text-center text-gray-200 mt-10">Loading users...</p>;

    return (
        <div className="w-full px-4 py-6">
            <h1 className="text-2xl mt-[2rem] lg:text-3xl xl:text-4xl text-center font-bold text-[#1b140c] mb-6 ">
                Shop Users
            </h1>

            <div className="overflow-x-auto mt-[1.5rem]">
                <table className="min-w-full border  border-black text-gray-800 text-sm lg:text-base xl:text-lg">
                    <thead className="bg-[#045512] text-white">
                        <tr className="h-10 lg:h-12 xl:h-14">
                            <th className="text-[21px] p-[7px]  text-center font-medium">First Name</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Last Name</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Email</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Phone</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Role</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Blocked</th>
                            <th className="text-[21px] p-[7px]  text-center font-medium">Email Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-[#04442c] cursor-pointer hover:text-white h-10 lg:h-12 xl:h-14">
                                <td className="p-[7px] pt-[25px] text-center">{user.firstName}</td>
                                <td className="p-[7px] pt-[25px] text-center">{user.lastName}</td>
                                <td className="p-[7px] pt-[25px] text-center">{user.email}</td>
                                <td className="p-[7px] pt-[25px] text-center">{user.phone || "NOT GIVEN"}</td>
                                <td className="p-[7px] pt-[25px] text-center">{user.role}</td>
                                <td className="p-[7px] pt-[25px] text-center">
                                    <button
                                        onClick={() => toggleBlockUser(user.email, user.isBlocked)}
                                        className={`px-2 lg:px-3 py-1 rounded ${user.isBlocked ? "bg-red-600" : "bg-green-600"
                                            } text-white text-xs lg:text-sm xl:text-base`}
                                    >
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </button>

                                </td>
                                <td className="p-[7px] pt-[25px] text-center">
                                    <button
                                        onClick={() => toggleEmailVerified(user.email, user.isEmailVerified)}
                                        className={`px-2 lg:px-3 py-1 rounded ${user.isEmailVerified ? "bg-green-600" : "bg-gray-500"
                                            } text-white text-xs lg:text-sm xl:text-base`}
                                    >
                                        {user.isEmailVerified ? "Verified" : "Not Verified"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginator */}
            <div className="flex justify-center items-center  space-x-4 mt-5 text-sm lg:text-base xl:text-lg">
                <button
                    onClick={() => page > 1 && setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-3 lg:px-4 py-1 lg:py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#198643] text-white"
                        }`}
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => page < totalPages && setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 lg:px-4 py-1 lg:py-2 rounded ${page === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#198643] text-white"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>

    );
}
