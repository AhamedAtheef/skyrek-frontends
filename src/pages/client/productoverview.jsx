import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import BarLoader from "../../components/homeloading"
import ImageSlider from "../../components/imageslider"
import { addCart, getCart } from "../../utils/cart";
import CategorieCard from "../../components/categories"

export default function ProductOverview() {
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { productId } = useParams(); 
    const [status, setStatus] = useState("loading"); // loading, success, error

    // ✅ fetch single product
    useEffect(() => {
        if (status === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/overview/${productId}`)
                .then((res) => {
                    setProduct(res.data);
                    console.log(res.data);
                    setStatus("success");
                })
                .catch(() => {
                    toast.error("Invalid Product Id");
                    setStatus("error");
                });
        }
    }, [status, productId]);

    // ✅ fetch related all products ()
    // ✅ 
    useEffect(() => {
        if (!product) return; // wait until product is set
        setLoading(true);

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search/${product.productname}`)
            .then((res) => {
                setCategories(res.data.products || []);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Category fetch error:", err);
                setLoading(false);
            });
    }, [product]); // <-- rerun when product changes



    return (
        <div className="w-full md:ml-[10px] lg:ml-[12px] xl:ml-0 h-auto bg-[#f8eee3ea] flex flex-col items-center ">

            {/* Loading */}
            {status == "loading" && <BarLoader />}

            {/* Success */}
            {status == "success" && (<div>
                <div className="w-[20rem] min-h-full h-auto flex flex-col mt-[30%]
                md:w-[50rem] md:mt-[15%] lg:flex-row lg:gap-[16px] lg:w-[68rem] lg:mt-[10%] xl:mt-[8%] xl:ml-[10rem] xl:gap-[50px] 2xl:ml-[25rem]">

                    {/* Image Slider */}
                    <ImageSlider images={product.images} />

                    {/* Product Info */}
                    <div className="w-full md:w-[700px] md:ml-[3.2rem] lg:w-[800px] lg:ml-0 lg:mr-[5rem] xl:w-full xl:ml-0 xl:mr-0 h-auto pb-[3%] bg-[#f3eaea44] overflow-hidden md:mt-[2%] lg:mt-0 ">
                        <div className="w-full h-full flex flex-col gap-[5px]">
                            <div className="flex flex-col gap-[5px] px-[1%] py-[4%] 
                            md:py-[1%] lg:px-[5%] lg:gap-[5px] lg:mt-[2px] xl:px-[0%] ">
                                <h1 className="font-extrabold text-2xl mb-[5px] tracking-wide text-[#575452]
                                md:text-3xl lg:text-4xl">{product.productname}</h1>
                                <h2 className="font-sans text-[16px] text-black italic
                                md:text-2xl lg:text-3xl">"{product.altnames}"</h2>
                                <p className="border border-gray-300 bg-gray-50 rounded-[10px] p-[10px] mt-[10px] text-[15px] leading-relaxed text-gray-700 shadow-sm overflow-scroll h-[165px] hidden lg:block">{product.discription}</p>
                                <div className="flex items-center justify-between mt-[2px]">
                                    <p className={`text-[17px] md:text-1xl font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.stock > 0 ? `${product.stock} in stock ` : 'Almost sold out 🔥'}
                                    </p>
                                    {/* discount badge */}
                                    <span className="text-[13px] md:text-[15px] lg:mt-[5px] bg-yellow-200 text-yellow-900 px-2 py-0.5 mr-[5px] rounded-full font-semibold">
                                        Save {Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-2 mr-[5px] ">
                                    {/* price */}
                                    <p className="text-[20px] md:text-3xl font-extrabold text-black">
                                        LKR {Number(product?.price || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>

                                    {/* labelled Price */}
                                    <p className="text-[16px] md:text-2xl text-gray-500 line-through">
                                        LKR {Number(product?.labelledPrice || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>

                            </div>

                            {/* Buy + Add to Cart */}
                            <div className="flex px-[10px] justify-between lg:mt-[10px] lg:px-[10%] xl:px-[5%]">
                                <button className="cursor-pointer px-[20px] md:px-[25px] py-[5px] md:py[10px] bg-pink-500 hover:bg-pink-600 text-white hover:text-black text-center rounded-[10px] text-xl font-medium transition-all duration-200 shadow-md"
                                    onClick={() => {
                                        navigate("/user/checkout", {
                                            state: {
                                                items: [
                                                    {
                                                        productId: product.productId,
                                                        quantity: 1,
                                                        product: { ...product }
                                                    }
                                                ]
                                            }
                                        });
                                    }}
                                >
                                    Buy Now
                                </button>
                                <button className="cursor-pointer px-[10px] md:px[25px] py-[4px] md:py[8px] border-2 border-[#020b22] bg-black hover:bg-transparent hover:text-black font-mono text-white text-center rounded-[10px] text-xl transition-all duration-200 shadow-md"
                                    onClick={() => {
                                        addCart(product, 1);
                                        toast.success("Added to cart");
                                        console.log(getCart())
                                    }}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <h1 className="text-3xl font-bold mt-[50px] lg:mt-[20px] mb-[10px] tracking-wide text-[#332929] text-center md:text-3xl lg:text-4xl  ">Related Products</h1>
                {/* Categories */}
                {loading ? (
                    <BarLoader />
                ) : (
                    <div
                        className="w-full h-full flex bg-[#f8eee3ea] flex-wrap justify-start items-start 
          gap-10 px-[80px] pt-[40px] pb-[40px]
          min-[1440px]:gap-8 min-[1440px]:px-[60px] min-[1440px]:pl-[7rem]      
          min-[1500px]:gap-8 min-[1500px]:px-[60px] min-[1500px]:pl-[10rem]      
          max-[1440px]:gap-8 max-[1440px]:px-[40px]
          md:gap-4 
          xl:gap-[2rem] 2xl:pl-[12rem]
          max-[435px]:gap-[12px] max-[435px]:px-0 max-[435px]:pt-0 max-[435px]:pb-0
          max-[435px]:justify-start max-[435px]:items-start
          lg:ml-[20px] xl:ml-0 "
                    >

                        {categories.map((category,key) => {
                           return <CategorieCard  key = {key} product={category} />
                        })}
                    </div>
                )}
            </div>
            )}

            {/* Error */}
            {status == "error" && <h1>Error</h1>}
        </div>
    )
}
