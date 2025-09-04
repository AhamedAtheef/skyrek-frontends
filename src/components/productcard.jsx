import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;
  return (
    <Link
      to={"/user/overview/" + product.productId}
      className="group w-[22%] h-[400px] mt-[10px] rounded-xl overflow-hidden shadow-md border cursor-pointer border-gray-200 bg-white hover:shadow-2xl transition-all duration-300
         max-[435px]:mt-[30px] max-[435px]:bg-transparent max-[435px]:border-0 max-[435px]:shadow-none max-[435px]:hover:shadow-2xl
         max-[435px]:w-[calc(50%-7px)] max-[435px]:h-[250px] max-[435px]:rounded-none
         sm:w-[calc(33%-16px)] md:w-[29%] md:ml-[10px] md:h-[320px] lg:w-[28%] lg:h-[350px] lg:ml-[20px] xl:h-[360px] xl:w-[20%]"
    >
      {/* image */}
      <div className="bg-gray-100 w-full overflow-hidden relative">
        {product.labelledPrice > product.price && (
          <div className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 absolute rounded-r-[0.25rem]">
            Discounted
          </div>
        )}

        <img
          src={product.images[0]}
          alt={product.productimage}
          className="h-[300px] w-full object-center transform transition-transform duration-300 group-hover:scale-105
           max-[435px]:h-[180px] sm:h-[200px] md:h-[220px] lg:h-[230px] xl:h-[250px] "
        />
      </div>

      {/* content */}
      <div className="pb-4 md:px-4 pt-2 max-[435px]:px-2 max-[435px]:pt-1 max-[435px]:pb-2">
        {/* product name */}
        <h2 className="lg:text-[22px] font-semibold text-gray-800 max-[435px]:text-[16px] sm:text-[18px]">
          {product.productname}
        </h2>

        <div className="flex gap-[8px] md:mt-[5px] lg:gap-[15px] xl:gap-[6px] 2xl:gap-[5rem] items-center">
          {/* price */}
          <p className="lg:text-[22px] font-bold text-gray-900 max-[435px]:text-[16px] sm:text-[18px]">
            <span>
              LKR{product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>

          {/* labelled Price */}
          <p className="hidden lg:block text-[19px] text-gray-500 line-through max-[435px]:text-[14px] sm:text-[16px]">
            <span>
              LKR{product.labelledPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>
        </div>

        {/* stock */}
        <p
          className={`mt-1 text-sm font-medium max-[435px]:text-xs sm:text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Almost sold out"}
        </p>
      </div>
    </Link>
  )


}
