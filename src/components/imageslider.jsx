import { useState } from "react"

export default function ImageSlider({ images = [] }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <div className="w-full md:w-[700px] md:ml-[6%] xl:w-full xl:ml-0 flex flex-col items-center px-[1%] gap-2 md:gap-0">
      {/* Main Image */}
      <div className="w-full h-full md:h-[500px] lg:h-[600px]">
        <img
          src={images[activeImageIndex] || "/no-image.png"}
          alt="Product"
          className="w-full h-[250px] object-center transition-transform duration-300 hover:scale-105 md:w-full md:h-[480px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="w-full h-[100px] flex flex-wrap gap-3 justify-start md:w-full md:h-[150px] md:items-center md:mt-2 md:pl-[1%]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`cursor-pointer object-cover rounded-lg transition-all duration-300 hover:scale-105 shadow-sm 
              ${activeImageIndex === index
                ? "border-4 border-pink-500 scale-105"
                : "border-2 border-gray-300"
              } w-[70px] h-[70px] md:w-[120px] md:h-[120px] lg:w-[100px] lg:h-[100px]`}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
