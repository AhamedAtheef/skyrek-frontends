import { useState } from "react";
import { addCart, getCart } from "../../utils/cart";
import { TbTrashFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
    const [cart, setCart] = useState(getCart())
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate()


    const toggleChecked = (productId) => {
        setCheckedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const getCheckedTotal = () => {
        let total = 0;
        let labelledtotal = 0;
        cart.forEach((items) => {
            if (checkedItems.includes(items.productId)) {
                total += items.price * items.quantity;
                labelledtotal += items.labelledPrice * items.quantity;


            }
        });
        return {
            subtotal: total.toFixed(2),
            labelledtotal: labelledtotal.toFixed(2),


        }
    };



    return (
        <div className="min-w-full min-h-full h-auto flex flex-col pt-[28%] md:pt-[15%] lg:pt-[10%] xl:pt-[8%] pl-[3%] bg-[#f8f8f8]">
            <div className="overflow-y-scroll h-[600px] overflow-hidden flex flex-col gap-[15px] pr-[6rem] lg:ml-[3%]">
                <h1 className="text-2xl md:text-3xl text-[#52504e] font-semibold mb-[2%] ml-[4%]">Shopping Cart</h1>
                {
                    cart.map((items) => {
                        return (
                            <div
                                key={items.productId}
                                className="min-w-[280px] md:min-w-[700px] w-auto h-[100px] md:h-[300px] border-b-2 pb-[12px] border-gray-200 ml-[1%] 
                                 flex justify-between items-center"
                            >
                                {/* Left side */}
                                <div className="flex gap-[10px] items-center">
                                    {/* check box */}
                                    <input
                                        type="checkbox"
                                        checked={checkedItems.includes(items.productId)}
                                        onChange={() => toggleChecked(items.productId)}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <div className="w-[70px] md:w-[100px] h-[70px] md:h-[100px] bg-gray-100">
                                        <img src={items.images[0]} className="w-full h-full border-2 rounded-[10px]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-1xl text-[#e42082] md:text-2xl font-semibold tracking-wider mb-[2px]">{items.productname}</h1>
                                        
                                            <h1 className="text-1xl md:text-[20px] font-semibold text-gray-800">LKR.{items.price}</h1>
                                            <h1 className="text-1xl md:text-[20px] font-semibold text-gray-600 line-through hidden md:block">LKR.{items.labelledPrice}</h1>
                                        

                                        <div className="mt-[6px] border border-gray-400 w-[70px] px-1 flex justify-between 
                                                items-center text-[16px] rounded-full hover:border-2">
                                            <button className="cursor-pointer text-[18px]"
                                                onClick={(() => { addCart(items, -1), setCart(getCart()) })}>-</button>
                                            <span className="cursor-pointer text-[20px] text-blue-700 font-bold">{items.quantity}</span>
                                            <button className="cursor-pointer text-[18px]"
                                                onClick={(() => { addCart(items, 1), setCart(getCart()) })}>+</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side */}
                                <div className="flex flex-col items-end mt-[50px] gap-2 lg:gap-[30px]">
                                    <TbTrashFilled className="text-[18px] md:text-2xl lg:text-3xl cursor-pointer text-red-700 hover:text-red-600 hover:text-3xl"
                                        onClick={() => {
                                            addCart(items, -items.quantity)
                                            setCart(getCart())
                                        }}
                                    />
                                    <span className="text-1xl md:text-2xl  text-green-700 font-bold tracking-wider">
                                        LKR.{items.price * items.quantity}
                                    </span>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <div className="min-w-[300px] h-auto flex flex-row mt-[5%] xl:mt-[3%] xl:h-[100px] items-center mb-[2%] mr-[2%] justify-between p-[2%] rounded-[10px] border-2 border-gray-200 gap-[10px] bg-white shadow-lg shadow-gray-400/100">
                <h2 className="text-2xl xl:text-3xl mb-[10px] line-through text-gray-400 hidden md:block">labelled total : LKR.{getCheckedTotal().labelledtotal}</h2>
                <h2 className="text-1xl md:text-2xl xl:text-3xl mb-[10px] text-[#0c6835]">Subtotal : LKR.{getCheckedTotal().subtotal}</h2>
                <button className="px-[10px] md:px-[25px] py-[5px] md:py-[6px] lg:w-[300px] lg:text-2xl text-[14px] hover:bg-black rounded-full tracking-wider hover:text-white text-1xl font-semibold cursor-pointer  border-2 bg-[#0a194b] text-white"
                    onClick={() => {
                        const selectedItems = cart.filter(item => checkedItems.includes(item.productId));
                        if (selectedItems.length === 0)
                            return toast.error("Please select at least one item.");
                        navigate("/user/checkout", {
                            state: { items: selectedItems, total: getCheckedTotal().subtotal }
                        });
                    }}
                >Check Out</button>
            </div>
        </div >

    );
}
