import ProductCardSkeleton from "./productskelton";

const ProductSkeletonGrid = () => {
  return (
    <div
      className="w-full h-full flex flex-wrap justify-start items-start 
      gap-10 px-[80px] pt-[40px] pb-[40px]

      min-[1440px]:gap-8 min-[1440px]:px-[60px] min-[1440px]:pl-[7rem]      
      min-[1500px]:gap-8 min-[1500px]:px-[60px] min-[1500px]:pl-[10rem]      
      max-[1440px]:gap-8 max-[1440px]:px-[40px]
      md:gap-4 
      xl:gap-[2rem] 2xl:pl-[12rem]
      max-[435px]:gap-[12px] max-[435px]:px-0 max-[435px]:pt-0 max-[435px]:pb-0"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;
