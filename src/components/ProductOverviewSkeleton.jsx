const ProductOverviewSkeleton = () => {
  return (
    <div className="w-[20rem] min-h-full h-auto flex flex-col mt-[30%]
      md:w-[50rem] md:mt-[15%]
      lg:flex-row lg:gap-[16px] lg:w-[68rem] lg:mt-[10%]
      xl:mt-[8%] xl:gap-[50px] animate-pulse"
    >
      {/* Image slider skeleton */}
      <div className="w-full lg:w-[45%] h-[260px] md:h-[350px] lg:h-[420px] bg-gray-300 rounded-xl"></div>

      {/* Product info skeleton */}
      <div className="w-full md:w-[700px] lg:w-[800px] xl:w-full h-auto pb-[3%] bg-[#f3eaea44] rounded-xl">
        <div className="flex flex-col gap-[12px] px-[5%] py-[5%]">

          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-[70%]"></div>

          {/* Alt name */}
          <div className="h-6 bg-gray-300 rounded w-[50%]"></div>

          {/* Description */}
          <div className="hidden lg:block h-[165px] bg-gray-300 rounded mt-[10px]"></div>

          {/* Stock + discount */}
          <div className="flex justify-between items-center mt-3">
            <div className="h-5 bg-gray-300 rounded w-[35%]"></div>
            <div className="h-6 bg-gray-300 rounded w-[20%]"></div>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-8 bg-gray-300 rounded w-[35%]"></div>
            <div className="h-6 bg-gray-300 rounded w-[25%]"></div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <div className="h-[45px] bg-gray-300 rounded-lg w-[48%]"></div>
            <div className="h-[45px] bg-gray-300 rounded-lg w-[48%]"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductOverviewSkeleton;
