import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UploadFile from "../../utils/meadiaupload";
import Loading from "../../components/loading";


export default function UpdateProductPage() {
    /* 
    productId
    productname
    altnames
    labelledPrice
    price
    images
    discription
    stock
    isAvailable
    category
    
     */
    const location = useLocation();
    const [productId, setProductId] = useState(location.state.productId);
    const [productname, setProductname] = useState(location.state.productname);
    const [altnames, setAltnames] = useState(location.state.altnames.join(","));
    const [labelledPrice, setLaballedprice] = useState(location.state.labelledPrice);
    const [price, setPrice] = useState(location.state.price);
    const [images, setImages] = useState(location.state.images); // or [] if you're uploading images later
    const [discription, setDiscription] = useState(location.state.discription);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const [category, setCateqory] = useState(location.state.category);
    const navigate = useNavigate();
    const[isLoading,setIsloading]=useState(false)

    async function handleSubmit() {
        setIsloading(true)
        const promisesArray = images.map((image) => UploadFile(image));

        const response = await Promise.all(promisesArray);
        console.log(response)

        const alternativInArray = altnames.split(",");
        const productData = {
            productId,
            productname,
            altnames: alternativInArray,
            labelledPrice,
            price,
            images: response,
            discription,
            stock,
            isAvailable: isAvailable,
            category
        };

        if (response.length === 0) {
            productData.images = location.state.images
        }

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios.put(
            import.meta.env.VITE_BACKEND_URL + "/api/products/" + productData.productId,
            productData,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        )
            .then((res) => {
                console.log("Product Updated Successfully");
                console.log(res.data);
                toast.success("Product successfully updated");
                navigate("/admin/products");
            })
            .catch((error) => {
                console.error("Error updating products");
                console.log(error);
            })
            .finally(()=>{
                setIsloading(false)
            })

    }


    return (
        <div className="w-full h-full bg-white grid place-content-center">
            {isLoading?<Loading/>:<div>
            <div className="text-center mb-[30px] font-medium text-3xl">
                <h1>Update Products</h1>
            </div>
            <div className="w-[620px] h-[830px] border-[2px] rounded-2xl flex flex-row flex-wrap justify-between p-[40px]">
                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Product Id</label>
                    <input
                        disabled
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[300px] flex flex-col gap-[10px]">
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[500px] flex flex-col gap-[10px]">
                    <label>Alternative Name</label>
                    <input
                        type="text"
                        value={altnames}
                        onChange={(e) => setAltnames(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Labelled Price</label>
                    <input
                        type="number"
                        value={labelledPrice}
                        onChange={(e) => setLaballedprice(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[500px] flex flex-row flex-wrap items-center gap-[5px] my-[10px] border rounded-[5px] min-h-[100px] px-[10px] py-[10px] overflow-hidden">
                    {/* Image Previews */}
                    {images.map((img, index) => (
                        <div key={index} className="relative w-[80px] h-[70px] bg-[#ddd8d8] border border-gray-400 rounded-[5px] overflow-hidden">
                            <img
                                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover"
                            />

                            <button
                                onClick={() => {
                                    const newImages = [...images];
                                    newImages.splice(index, 1);
                                    setImages(newImages);
                                }}
                                className="absolute top-[-4px] right-[-4px] bg-red-600 text-white rounded-full w-[18px] h-[18px] text-xs flex items-center justify-center z-10 cursor-pointer"
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* Plus Button */}
                    {images.length < 10 && (
                        <>
                            <label
                                htmlFor="fileInput"
                                className="w-[80px] h-[70px] text-4xl text-center bg-[#ddd8d8] hover:bg-[#878383b1] pt-[10px] text-black cursor-pointer border border-gray-400 rounded-[5px]"
                            >
                                +
                            </label>
                            <input
                                hidden
                                id="fileInput"
                                multiple
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    const totalFiles = [...images, ...files].slice(0, 10);
                                    setImages(totalFiles);
                                }}
                            />
                        </>
                    )}
                </div>

                <div className="w-[500px] flex flex-col gap-[10px]">
                    <label>Discription</label>
                    <textarea
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        className="w-full h-[100px]  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    ></textarea>
                </div>

                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full  rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none pl-[4px] py-[3px]"
                    />
                </div>

                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Is Available</label>
                    <select
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value)}
                        className=" rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none"
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>

                <div className="w-[200px] flex flex-col gap-[10px]">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCateqory(e.target.value)}
                        className=" rounded-[5px] border-[2px] focus:border-blue-900 focus:outline-none"
                    >
                        <option value="Cream">Cream</option>
                        <option value="Soap">Soap</option>
                        <option value="Face Wash">Face Wash</option>
                        <option value="Fragrance" >Fragrance</option>
                    </select>
                </div>

                <div className="w-full flex justify-center items-center mt-[30px] gap-[30px]">
                    <Link to="/admin/products" className="border-[2px]  w-[200px] px-[20px] py-[5px] rounded-[5px] text-center hover:bg-gray-100 ">Cancel</Link>
                    <button to="/admin/products" className="w-[200px]  px-[20px] py-[6px] rounded-[5px] cursor-pointer text-center  bg-black text-white " onClick={handleSubmit}>Update Products</button>
                </div>

            </div>
            </div>}
        </div>
    )

}