import { useEffect, useState } from "react"
import axios from "axios";
import Loading from "../../components/loading";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [popup, setPopup] = useState(false);
    const [clickorder, setClickorder] = useState(null);
    const [status, setStatus] = useState("Pending");
    const [notes, setNotes] = useState(null)
    const token = localStorage.getItem("token");
    console.log(status)

    useEffect(() => {
        if (loading) {
            axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/orders/" + page + "/" + limit,
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then((res) => {
                    setOrders(res.data.orders);
                    setTotalPages(res.data.totalPages);
                    setLoading(false);

                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [loading, page, limit]);

    async function updateOrderStatus() {
        try {
            const response = await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/orders/" + clickorder.orderID,
                { status: status, notes: notes },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
            setPopup(false);
            toast.success("Order Status Updated");
            setLoading(true);
        } catch (error) {
            console.error(error);
            setPopup(false);
            toast.error("can't update order status");
            setLoading(true);
        }

    }
    return (
        <div className="w-full h-full bg-white pt-[20px]">
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />
            <div className="overflow-x-auto w-full p-[50px] mt-[30px]">
                <h1 className="text-[30px] font-bold ">Orders List</h1>
                {loading ? <Loading /> : <table className="w-full min-h-full h-auto my-4  ">
                    <thead className="border-2 border-[#152f22]300 mb-[30px] ">
                        <tr className="bg-[#082919] text-white">
                            <th className="text-[21px] p-[7px]  text-center font-medium">Order Id</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">User Email</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Name</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Address</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Phone</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Status</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Total</th>
                            <th className="text-[21px] p-[7px] text-center font-medium">Date</th>


                        </tr>
                    </thead>
                    <tbody className="border-2 border-gray-300 ">
                        {orders.map((order, index) => {
                            return (
                                <tr key={index} className="hover:bg-[#72bd85] hover:border-t-2 hover:border-t-gray-300 cursor-pointer" onClick={
                                    () => {
                                        setStatus(order.status)
                                        setNotes(order.notes)
                                        setClickorder(order)
                                        setPopup(true)
                                    }
                                }>
                                    <td className="p-[7px] pt-[25px] text-center">{order.orderID}</td>
                                    <td className="p-[7px] pt-[25px] text-center">{order.email}</td>
                                    <td className="p-[7px] pt-[25px] text-center">{order.name}</td>
                                    <td className="p-[7px] pt-[25px] text-center">{order.address}</td>
                                    <td className="p-[7px] pt-[25px] text-center">{order.phone}</td>
                                    <td className={`p-[7px] pt-[25px] text-center
                                        ${order.status === "Pending" ? "text-yellow-400"
                                            : order.status === "Completed" ? "text-green-500"
                                                : "text-red-500"}`}>{order.status}</td>
                                    <td className="p-[7px] pt-[25px] text-center">LKR.{order.total.toFixed(2)}</td>
                                    <td className="p-[7px] pt-[25px] text-center">{new Date(order.date).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>}
            </div>
            {
                popup && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#0808086b] backdrop-blur-[0.5px] flex items-center justify-center">
                        <div className="min-w-[1000px]  min-h-[600px] pb-[1.5%] px-[30px] h-auto bg-white rounded-lg relative">
                            {
                                clickorder && (
                                    <div>
                                        <div className="flex justify-between">
                                            <div>
                                                <h1 className="text-[30px] font-bold text-center mt-[20px]">Order Details</h1>
                                                <div>
                                                    <h1 className="text-[22px]  mt-[15px]"><span className="font-semibold">Order Id :</span> {clickorder.orderID}</h1>
                                                    <h1 className="text-[20px]  mt-[15px]"><span className="font-semibold">User Email :</span> {clickorder.email}</h1>
                                                    <h1 className="text-[20px]  mt-[15px]"><span className="font-semibold">Name :</span> {clickorder.name}</h1>
                                                    <h1 className="text-[20px]  mt-[15px]"><span className="font-semibold">Address :</span> {clickorder.address}</h1>
                                                    <h1 className="text-[20px]  mt-[15px]"><span className="font-semibold">Phone :</span> {clickorder.phone}</h1>
                                                </div>

                                                <div className="flex items-center gap-5 text-center">
                                                    <h1 className="text-[20px]">
                                                        <span className="font-semibold">Status :</span>{" "}
                                                        <span className={`capitalize pb-[2px] px-[2px] ${clickorder.status === "Pending" ? "bg-yellow-100"
                                                            : clickorder.status === "Completed" ? "bg-green-300"
                                                                : "bg-red-300"}`}
                                                        >{clickorder.status}
                                                        </span>
                                                    </h1>

                                                    <select
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        value={status}
                                                        className="cursor-pointer focus:outline-none border border-gray-400 rounded px-2 pb-1 text-gray-600"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                <h1 className="text-[22px]  mt-[15px] mb-[15px]"><span className="font-semibold">Date : </span>  {new Date(clickorder.date).toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}</h1>
                                                <label htmlFor="notes" className="text-[20px] font-semibold cursor-pointer" >Notes: </label>
                                            </div>

                                            <div className="flex flex-col gap-[20px]">
                                                <h1 className="text-center text-[30px] font-bold mt-[15px]">Items</h1>
                                                <div className="max-h-[250px] min-w-[480px] w-auto py-[1%]  h-auto overflow-y-scroll ">
                                                    {clickorder.items.map((item, index) => (

                                                        <div key={index} className=" mt-[20px] border-t-2 border-[#258f40] pt-[1%] flex gap-[20px] ">

                                                            <div>{item.images && item.images.length > 0 && (
                                                                <img
                                                                    src={item.images[0]}
                                                                    alt={item.name}
                                                                    className="w-[100px] h-auto rounded-2xl mt-2 border-2 border-gray-300 "
                                                                />
                                                            )}
                                                            </div>
                                                            <div>
                                                                <h1 className="text-[20px]">Product Id : {item.productId}</h1>
                                                                <h1 className="text-[20px]">Product Name : {item.name}</h1>
                                                                <h1 className="text-[20px]">Price : LKR.{item.price}</h1>
                                                                <h1 className="text-[20px]">Quantity : {item.qty}</h1>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <h1 className="text-[25px] text-[#06331d] mt-[10px] font-semibold pt-[5px] border-t-2 border-[#787978]">Total : LKR.{clickorder.total.toFixed(2)}</h1>
                                            </div>
                                        </div>
                                        <div className="w-full h-[200px] flex justify-between mt-[15px]">
                                            <textarea
                                                name="notes"
                                                id="notes"
                                                className="w-[60%] mt-[4%] h-[150px] border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            ></textarea>

                                            {
                                                (status !== clickorder.status || notes !== clickorder.notes) && <button
                                                    className="bg-[#0c3617] tracking-wider text-white text-center rounded-md py-[5px] w-[150px] h-[45px] mt-[16%] cursor-pointer"
                                                    onClick={updateOrderStatus}>Save Changes</button>
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            <button className="absolute top-[-30px] right-[-15px] text-2xl text-[#083a22] cursor-pointer hover:text-3xl " onClick={
                                () => {
                                    setPopup(false)
                                }
                            }>
                                X
                            </button>

                        </div>
                    </div>
                )
            }

        </div>

    )
}