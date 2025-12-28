const ProductCardSkeleton = () => {
  return (
    <div
      className="w-[22%] h-[400px] mt-[10px] rounded-xl overflow-hidden
      shadow-md border border-gray-200 bg-white animate-pulse

      max-[435px]:mt-[30px] max-[435px]:bg-transparent max-[435px]:border-0 max-[435px]:shadow-none
      max-[435px]:w-[calc(50%-7px)] max-[435px]:h-[250px] max-[435px]:rounded-none

      sm:w-[calc(33%-16px)]
      md:w-[29%] md:ml-[10px] md:h-[320px]
      lg:w-[28%] lg:h-[350px] lg:ml-[20px]
      xl:h-[360px] xl:w-[20%]"
    >
      {/* Image skeleton */}
      <div className="bg-gray-300 w-full relative">
        <div
          className="h-[300px] w-full
          max-[435px]:h-[180px]
          sm:h-[200px]
          md:h-[220px]
          lg:h-[230px]
          xl:h-[250px]"
        />
      </div>

      {/* Content skeleton */}
      <div className="pb-4 md:px-4 pt-2 max-[435px]:px-2 max-[435px]:pt-1 max-[435px]:pb-2">
        {/* Product name */}
        <div className="h-5 bg-gray-300 rounded w-[80%] max-[435px]:h-4"></div>

        {/* Price row */}
        <div className="flex gap-[8px] mt-3 items-center">
          <div className="h-5 bg-gray-300 rounded w-[40%] max-[435px]:h-4"></div>
          <div className="hidden lg:block h-4 bg-gray-300 rounded w-[30%]"></div>
        </div>

        {/* Stock */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-[50%] max-[435px]:h-3"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
