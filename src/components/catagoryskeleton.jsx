import ProductCardSkeleton from "./productskelton";

const RelatedProductsSkeleton = () => {
  return (
    <div
      className="w-full h-full flex bg-[#f8eee3ea] flex-wrap justify-start items-start 
      gap-10 px-[80px] pt-[40px] pb-[40px]
      min-[1440px]:gap-8 min-[1440px]:px-[60px] min-[1440px]:pl-[7rem]      
      min-[1500px]:gap-8 min-[1500px]:px-[60px] min-[1500px]:pl-[10rem]      
      max-[1440px]:gap-8 max-[1440px]:px-[40px]
      md:gap-4 xl:gap-[2rem] 2xl:pl-[12rem]
      max-[435px]:gap-[12px] max-[435px]:px-0"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default RelatedProductsSkeleton;
