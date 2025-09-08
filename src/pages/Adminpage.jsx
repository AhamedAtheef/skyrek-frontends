import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import ProductsAdminPage from "./admin/productAdminPage";
import AddProductPage from "./admin/addProductsAdminPage";
import UpdateProductPage from "./admin/updateProducts";
import OrdersAdminPage from "./admin/ordersAdminpage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import axios from "axios";
import ReviewAdminPage from "./admin/reviewadminpage";
import UsersAdminpage from "./admin/usersAdminpage";
export default function Adminpage() {
    const [adminValidate, setAdminValidate] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            navigate("/login");
        } else {
            setAdminValidate(true);
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/isadmin", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                console.log(res.data);
                if (res.data.role && res.data.role.toLowerCase() === "admin") {
                    setAdminValidate(false);
                } else {
                    toast.error("You are not an admin");
                    navigate("/");
                }

            }).catch((err) => {
                console.error("Error fetching user:", err);
                toast.error("Error fetching user");
            })
        }
    }, [])



    return (
        <div className="w-full min-h-full h-auto bg-white flex">
            {adminValidate ? <Loading /> : (<div className="w-full min-h-full h-auto bg-white flex">
                <div className="w-[300px] lg:w-[250px] min-h-full h-auto bg-[#152f22]  border-r-3 border-black text-white" >
                    <h1 className="text-[25px] m-[20px]  mb-[30px] font-bold text-center tracking-widest text-[#99f1c1]">Admin Panel</h1>
                    <div className="flex flex-col mt-[4rem] ml-[30px] text-[20px] gap-[45px] text-white ">
                        <Link className="flex flex-row items-center gap-[10px]  hover:bg-white hover:text-[#152f22] hover:p-[5px] hover:rounded-lg" to="/admin"> <RiDashboardHorizontalFill />DashBoard</Link>
                        <Link className="flex flex-row items-center gap-[10px]  hover:bg-white hover:text-[#152f22] hover:p-[5px] hover:rounded-lg" to="/admin/products"> <FaBoxArchive />Products</Link>
                        <Link className="flex flex-row items-center gap-[10px]  hover:bg-white hover:text-[#152f22] hover:p-[5px] hover:rounded-lg" to="/admin/orders"> <TbTruckDelivery />Orders</Link>
                        <Link className="flex flex-row items-center gap-[10px]  hover:bg-white hover:text-[#152f22] hover:p-[5px] hover:rounded-lg" to="/admin/users"> <FaUserFriends />Users</Link>
                        <Link className="flex flex-row items-center gap-[10px]  hover:bg-white hover:text-[#152f22] hover:p-[5px] hover:rounded-lg" to="/admin/review"> <MdReviews />Reviews</Link>
                        

                    </div>
                </div>
                <div className="w-[calc(100%-300px)]  text-xl">
                    <Routes>
                        <Route path="/" element={<h1>DashBoard</h1>} />
                        <Route path="/products" element={<ProductsAdminPage />} />
                        <Route path="/newproduct" element={<AddProductPage />} />
                        <Route path="/users" element={<UsersAdminpage />} />
                        <Route path="/orders" element={<OrdersAdminPage />} />
                        <Route path="/update" element={<UpdateProductPage />} />
                        <Route path="/review" element={<ReviewAdminPage />} />
                    </Routes>
                </div>
            </div>)}
        </div>

    )
}