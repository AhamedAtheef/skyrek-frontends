import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProfile() {
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/isadmin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
        if (res.data.firstName && res.data.lastName) {
          localStorage.setItem("adminName", `${res.data.firstName} ${res.data.lastName}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [token]);

  const handleSave = async () => {
    try {
      const payload = {
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        email: adminData.email,
        phone: adminData.phone,
      };

      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/users/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="w-full p-8 pt-[10%] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
            {adminData.firstName ? adminData.firstName[0].toUpperCase() : "A"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {adminData.firstName + " " + adminData.lastName}
            </h2>
            <p className="text-gray-500">{adminData.role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={adminData.firstName || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded-lg ${editMode ? "border-green-500" : "border-gray-300 bg-gray-100"
                }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={adminData.lastName || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded-lg ${editMode ? "border-green-500" : "border-gray-300 bg-gray-100"
                }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded-lg ${editMode ? "border-green-500" : "border-gray-300 bg-gray-100"
                }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={adminData.phone || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 border rounded-lg ${editMode ? "border-green-500" : "border-gray-300 bg-gray-100"
                }`}
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-800 text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          )}
          <div>
          <Link to={"/forgotpassword"} className="bg-green-800 text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-green-700 transition">Forget Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
