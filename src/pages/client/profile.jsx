import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import BarLoader from "../../components/homeloading";
import UploadFile from "../../utils/meadiaupload";


export default function Profile() {
    const [userdata, setUserData] = useState({});
    const [images, setImages] = useState(null); // single image
    const page = 1;
    const limit = 10;
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/${page}/${limit}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUserData(res.data);
                if (res.data.firstName && res.data.lastName) {
                    localStorage.setItem(
                        "UserName",
                        `${res.data.firstName} ${res.data.lastName}`
                    );
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    const handleSave = async () => {

        try {
            setLoading(true);
            let imageUrl = userdata.image || null; // use existing image if no new upload

            if (images) {
                imageUrl = await UploadFile(images);
            }

            const payload = {
                image: imageUrl,
                firstName: userdata.firstName,
                lastName: userdata.lastName,
                email: userdata.email,
                phone: userdata.phone,
            };

            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/users/",
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Profile updated successfully");
            setEditMode(false);
            setLoading(false);
            setImages(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <div><BarLoader/></div>;

    return (
        <div className="w-full p-4 sm:p-6 md:p-8 bg-[url('/profile.jpg')] bg-cover bg-center bg-no-repeat pt-[10%] min-h-screen">
            {loading ? <BarLoader/>:<div className="max-w-3xl mx-auto backdrop-blur-md md:backdrop-blur-md p-4 mt-[25%] lg:mt-[10%] sm:p-6 md:p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
                    {/* Profile Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center group">
                        {images ? (
                            <>
                                <img
                                    src={URL.createObjectURL(images)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                {/* X button on hover */}
                                {editMode && (
                                    <button
                                        type="button"
                                        onClick={() => setImages(null)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition text-4xl text-white font-bold"
                                    >
                                        ×
                                    </button>
                                )}
                            </>
                        ) : userdata.image ? (
                            <>
                                <img
                                    src={userdata.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                {editMode && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer transition text-4xl text-white font-bold">
                                        +
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    if (file.size > 2 * 1024 * 1024) {
                                                        toast.error("File size must be less than 2MB");
                                                        return;
                                                    }
                                                    setImages(file);
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </>
                        ) : (
                            <>
                                <span
                                    className={`text-3xl text-gray-700 font-bold transition ${editMode ? "opacity-0" : "opacity-100"}`}
                                >
                                    {userdata.firstName ? userdata.firstName[0].toUpperCase() : "A"}
                                </span>

                                {/* Plus button on hover in edit mode */}
                                {editMode && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer transition text-4xl text-white font-bold">
                                        +
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    if (file.size > 2 * 1024 * 1024) {
                                                        toast.error("File size must be less than 2MB");
                                                        return;
                                                    }
                                                    setImages(file);
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </>
                        )}

                    </div>

                    {/* Name */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#ddb515]">
                            {userdata.firstName + " " + userdata.lastName}
                        </h2>
                    </div>
                </div>

                {/* Form */}
                <div className="mt-6 sm:mt-8 space-y-4">
                    <div>
                        <label className="block text-[#e4a124] mb-1 text-sm sm:text-base">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={userdata.firstName || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                            className={`w-full p-2 border rounded-lg text-white text-sm sm:text-base ${editMode ? "border-[#ecbf6a]" : "border-[#f7b232]"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-[#f5b031] mb-1 text-sm sm:text-base">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={userdata.lastName || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                            className={`w-full p-2 border rounded-lg text-white text-sm sm:text-base ${editMode ? "border-[#ecbf6a]" : "border-[#f7b232]"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-[#f5b031] mb-1 text-sm sm:text-base">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userdata.email || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                            className={`w-full p-2 border rounded-lg text-white text-sm sm:text-base ${editMode ? "border-[#ecbf6a]" : "border-[#f7b232]"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-[#f5b031] mb-1 text-sm sm:text-base">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={userdata.phone || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                            className={`w-full p-2 border rounded-lg text-white text-sm sm:text-base ${editMode ? "border-[#ecbf6a]" : "border-[#f7b232]"
                                }`}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-2 sm:space-y-0">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-[#ddb515] text-black px-6 py-2 md:px-[4rem] rounded-lg hover:bg-[#d1ab14c7] transition text-sm sm:text-base"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="bg-gray-300 text-gray-700 px-6 py-2 md:px-[4rem] rounded-lg hover:bg-gray-400 transition text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                            <Link
                                to={"/forgotpassword"}
                                className="bg-[#ddb515] text-black text-center px-6 py-2 cursor-pointer rounded-lg hover:bg-[#d1ab14c7] transition text-sm sm:text-base"
                            >
                                Forget Password
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-[#ddb515] text-black px-6 py-2 cursor-pointer rounded-lg hover:bg-[#d1ab14c7] transition text-sm sm:text-base"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>}
        </div>
    );
}
