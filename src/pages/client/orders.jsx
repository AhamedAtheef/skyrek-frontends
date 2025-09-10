import { useEffect, useState } from "react";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import toast from "react-hot-toast";
import BarLoader from "../../components/homeloading";

export default function UserOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/orders/myorders",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to fetch orders");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderID) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderID}`,
                { status: "Cancelled" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Order cancelled successfully");
            fetchOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to cancel order");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-[5rem] px-4 sm:px-6 lg:px-[10%] xl:px-[12%]">
            <h2 className="text-[25px] md:text-3xl md:text-center lg:mt-[2%] font-semibold mb-6">My Orders</h2>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <BarLoader />
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center py-12">
                    <FaBox className="text-4xl text-gray-400 mb-2" />
                    <p className="text-gray-500 text-lg">No orders found 😌</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow rounded-2xl p-4 border w-full sm:w-[48%] md:w-[45%] lg:w-[30%] xl:w-[28%] flex-shrink-0"
                        >
                            <div className="flex justify-between mb-2 items-center">
                                <p className="text-[18px] md:text-[17px] font-semibold">
                                    Order #{order.orderID}
                                </p>
                                <span
                                    className={`text-[14px] md:text-[15px] px-2 md:px-3 py-1 md:py-2 rounded-full ${order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "Cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <p className="text-[16px] md:text-[17px] text-gray-600">
                                Date: {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-[16px] md:text-[17px] text-gray-600">
                                Total: ${order.total}
                            </p>

                            <div className="mt-3">
                                <p className="font-medium text-[18px] md:text-2xl mb-2">Items:</p>
                                <ul className="text-[16px] md:text-[17px] text-gray-600 space-y-2">
                                    {Array.isArray(order.items) &&
                                        order.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center space-x-3">
                                                {item.images && item.images.length > 0 && (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                                                    />
                                                )}
                                                <div className="flex-1 text-[15px] md:text-[16px]">
                                                    {item.name} x {item.qty} – ${item.price}
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            {order.status === "Pending" && (
                                <button
                                    onClick={() => cancelOrder(order.orderID)}
                                    className="mt-4 cursor-pointer w-full py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600"
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
