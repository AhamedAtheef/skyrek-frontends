import { useState, useEffect } from "react";
import { TbTrashFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BarLoader from "../../components/homeloading";

export default function CheckOutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.items || []);
    const [subtotal, setSubTotal] = useState(location.state?.total || 0);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [checkedItems, setCheckedItems] = useState(() =>
        cart.map((item) => item.productId)
    ); // All items checked by default

    useEffect(() => {
        if (location.state == null || !location.state.items) {
            toast.error("Please select items to checkout");
            navigate("/user/products");
        } else {
            setCart(location.state.items);
        }
    }, [location, navigate]);

    const getCheckedTotal = () => {
        let total = 0;
        const shippingCharge = 300;
        const discountRate = 0.1;

        cart.forEach((item) => {
            if (checkedItems.includes(item.productId)) {
                total += item.product ? item.product.price * item.quantity : item.price * item.quantity;
            }
        });

        const discount = total * discountRate;
        const fullTotal = total - discount + shippingCharge;

        return {
            subtotal: total.toFixed(2),
            shippingCharge: shippingCharge.toFixed(2),
            discount: discount.toFixed(2),
            fullTotal: fullTotal.toFixed(2),
        };
    };

    const total = getCheckedTotal(); // ✅ store result in a variable

    async function placeOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            toast.error("Please login to place order");
            return;
        }

        // Build order items array
        const selectedItems = cart
            .filter(item => checkedItems.length === 0 || checkedItems.includes(item.productId))
            .map(item => ({
                productId: item.productId,
                qty: item.quantity,
                images: item.product ? item.product.images : item.images
            }));
        console.log(selectedItems)

        const order = {
            name: name,
            address: address,
            phone: phone.toString(),
            items: selectedItems,
            total: total.fullTotal
        };
        console.log(order)

        try {
            if (order.name === "" || order.address === "" || order.phone === "") {
                toast.error("Please fill all the details");
                return;
            }
            setLoading(true)
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setLoading(false)
            toast.success("Order Placed Successfully");
            return
        } catch (error) {
            setLoading(false)
            toast.error("Failed to place order");
            console.log(error);
            return;
        }
    }

    return (
        <div className="w-full min-h-full h-auto border-b-2 flex flex-col pt-[28%] md:pt-[15%] lg:pt-[10%] lg:flex-row lg-gap-[2%] 
        xl:pt-[8%] pl-[3%] bg-[#f8f8f8]">
            {loading ? <BarLoader /> :
                <div className="overflow-y-scroll max-h-[350px] md:max-h-[500px] lg:max-h-[800px] h-auto overflow-hidden flex flex-col gap-[15px] pr-[2rem] lg:ml-[2%] lg:gap-[10px] xl:mt-[0%] ">
                    <h1 className="text-2xl md:text-3xl xl:text-4xl text-[#52504e] font-semibold mb-[2%] ml-[4%]">Selected Items</h1>
                    {
                        cart.map((items, index) => {
                            return (
                                <div key={items.productId} className="w-[280px] md:min-w-[700px] lg:min-w-[550px] xl:min-w-[900px] h-[100px] md:h-[300px] border-b-2 pb-[12px] border-gray-200 ml-[1%] 
                                 flex justify-between items-center ">
                                    {/* Left side: image + details + quantity */}
                                    <div className="flex gap-[15px]">

                                        <div className="w-[70px] md:w-[100px] h-[70px] md:h-[100px] bg-gray-100">
                                            <img src={(items.product ? items.product.images[0] : items.images[0])} className="w-full h-full border-2 rounded-[10px]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-1xl text-[#e42082] md:text-2xl font-semibold tracking-wider mb-[2px]">{items.product ? items.product.productname : items.productname}</h1>
                                            <h1 className="text-1xl md:text-[20px] font-semibold text-gray-800">LKR.{items.product ? items.product.price : items.price}</h1>
                                            <h1 className="text-1xl md:text-[20px] font-semibold text-gray-600 line-through hidden md:block">LKR.{items.product ? items.product.labelledPrice : items.labelledPrice}</h1>

                                            <div className="mt-[6px] border border-gray-400 w-[70px] px-1 flex justify-between 
                                                items-center text-[16px] rounded-full hover:border-2">
                                                <button className="cursor-pointer text-[18px]" onClick={() => {
                                                    const newCart = [...cart];
                                                    newCart[index].quantity -= 1;
                                                    setCart(newCart);
                                                    if (newCart[index].quantity < 1) {
                                                        newCart[index].quantity = 1;
                                                    }
                                                }}>-</button>
                                                <span className="cursor-pointer text-[20px] text-blue-700 font-bold">{items.quantity}</span>
                                                <button className="cursor-pointer text-[18px]" onClick={() => {
                                                    const newCart = [...cart];
                                                    newCart[index].quantity += 1;
                                                    setCart(newCart);
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side: total price */}
                                    <div className="flex flex-col items-end mt-[50px] gap-2 md:gap-[40px] lg:gap-[60px] ">
                                        <TbTrashFilled
                                            className="text-[18px] md:text-2xl lg:text-2xl cursor-pointer text-red-700 hover:text-red-600 hover:text-3xl"
                                            onClick={() => {
                                                const newCart = [...cart];
                                                newCart.splice(index, 1);
                                                setCart(newCart);
                                            }}
                                        />
                                        <span className="text-1xl md:text-2xl  text-green-700 font-bold tracking-wider">
                                            LKR.{items.product ? items.product.price * items.quantity : items.price * items.quantity}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>}

            {/* Order Summary */}
            <div className="w-[280px] md:w-[700px] lg:w-[380px] 2xl:min-w-[500px]  flex flex-col  md:h-[520px] ml-[2%] lg:ml-[0%] xl:ml-[3%] 2xl:ml-[5%] mt-[5%] p-[1%] pb-[2%] md:rounded-[10px] bg-transparent md:border-2 md:border-gray-200 gap-[3px] md:bg-white shadow-lg md:shadow-gray-400/100">
                <h1 className="text-2xl md:text-3xl text-center text-[#52504e] font-serif mb-[10px]">Order Summary</h1>
                <h2 className="text-[17px] md:text-2xl "><span className="mr-[10px]">Subtotal : </span>LKR.{total.subtotal}</h2>
                <h2 className="text-[17px] md:text-2xl"><span className="mr-[10px]">Shipping Charge: </span>LKR.{total.shippingCharge}</h2>
                <h2 className="text-[17px] md:text-2xl text-red-500"><span className="mr-[10px]">Total Discount: </span>LKR.{total.discount}</h2>
                <div className="w-full h-full flex flex-col gap-[3px] pt-[3%] mt-[3%]  border-t-2 border-gray-200">
                    <h1 className="text-[18px] md:text-2xl font-semibold text-green-800 tracking-wider border-b-2 border-gray-200 pb-[3px] "><span className="mr-[4.7rem]">Total:</span>
                        {`LKR. ${(Number(total?.fullTotal) || 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`}
                    </h1>
                    <div className="flex flex-col gap-[5px] mt-[1%] mb-[3%] ">
                        <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] tracking-wider text-center mb-[15px]">Shipping Detailes</h1>
                        <input type="text " className="px-[5px] py-[2px] w-full h-[30px] md:h-[40px] border border-black rounded-[10px] focus:outline-blue-700 "
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name" />

                        <input type="text " className="px-[5px] py-[2px] w-full h-[30px] md:h-[40px] border border-black rounded-[10px] focus:outline-blue-700  "
                            onChange={(e) => setAddress((e.target.value))}
                            placeholder="Enter Your Address" />

                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setPhone(digitsOnly);
                            }}
                            placeholder="Enter Your Phone Number"
                            className="px-[5px] py-[2px] w-full h-[30px] md:h-[40px] border border-black rounded-[10px] focus:outline-blue-700 "
                        />

                    </div>
                    <button onClick={placeOrder} className="w-full h-[30px] md:h-[40px] md:text-2xl hover:bg-black rounded-full tracking-wider hover:text-white text-1xl font-semibold cursor-pointer border-2 border-black text-[#0a194b]">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
