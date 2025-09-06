import axios from "axios";
import { useEffect, useState } from "react";
import BarLoader from "../../components/homeloading";
import ProductCard from "../../components/productcard";
import { IoIosSearch } from "react-icons/io";


export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productname, setProductname] = useState("");
  useEffect(() => {
    if (loading) {
      if (productname === "") {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/allproducts/1/1000`)
          .then((res) => {
            setProducts(res.data.products);
            console.log(res.data);
            setLoading(false);
          });

      }
      else {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + productname).then((res) => {
          console.log(res.data);
          setProducts(res.data.products);
          setLoading(false);
        });
      }
    };
  }, [loading, productname]);
  return (
    <div className="w-full  bg-[#f8f1e98e] mt-[60px] xl:mt-[80px] pt-[20px] ">
      <div className="xl:w-full px-[3px] h-[30px] xl:h-[40px] flex md:justify-center mt-[10px] ">
        <div className="relative max-[435px]:w-[100%] ">
          <input type="text" className="text-[15px] md:text-[16px] border-2 lg:border-0 w-[100%] md:w-[400px] h-[100%] lg:w-[500px] lg:h-[35px] xl:w-[600px]  lg:bg-[#f0ede5]  focus:outline-none rounded-2xl px-[10px] xl:placeholder:text-[18px] placeholder:text-[16px] "
            placeholder="Search Products" onChange={(e) => { setProductname(e.target.value); setLoading(true); }} />
          <IoIosSearch className="absolute top-[4px] right-[10px] text-[24px] lg:top-[5px] cursor-pointer" />
        </div>
      </div>
      {
        loading ? (<BarLoader />) : (
          <div
            className="w-full h-full flex flex-wrap justify-start items-start 
      gap-10 px-[80px] pt-[40px] pb-[40px]
      
      min-[1440px]:gap-8 min-[1440px]:px-[60px] min-[1440px]:pl-[7rem]      
      min-[1500px]:gap-8 min-[1500px]:px-[60px] min-[1500px]:pl-[10rem]      
      max-[1440px]:gap-8 max-[1440px]:px-[40px]
      md:gap-4 
      xl:gap-[2rem] 2xl:pl-[12rem]
      max-[435px]:gap-[12px] max-[435px]:px-0 max-[435px]:pt-0 max-[435px]:pb-0
      max-[435px]:justify-start max-[435px]:items-start"
          >
            {products.map((product) => {
              return <ProductCard key={product.productId} product={product} />;
            })}
          </div>
        )
      }
    </div>
  );
}
