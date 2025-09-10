import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const fakeReviews = [
  { name: "Sophia Lee", email: "sophia@example.com", rating: 5, comment: "Absolutely love CBC Cosmetics! My skin has never looked better." },
  { name: "Emma Johnson", email: "emma.johnson@example.com", rating: 4, comment: "Great products and amazing customer service!" },
  { name: "Olivia Brown", email: "olivia.brown@example.com", rating: 5, comment: "High-quality makeup and skincare. Totally recommend!" },
  { name: "Mia Williams", email: "mia.williams@example.com", rating: 5, comment: "Beautiful packaging and outstanding formulas!" },
];

export default function FakeReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (num) => {
    const filled = "★".repeat(num);
    const empty = "☆".repeat(5 - num);
    return <span className="text-amber-100  text-lg md:text-xl">{filled}{empty}</span>;
  };

  const prevReview = () =>
    setCurrentIndex((prev) => (prev === 0 ? fakeReviews.length - 1 : prev - 1));
  const nextReview = () =>
    setCurrentIndex((prev) => (prev === fakeReviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full bg-[#fff4e0] py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl text-center text-[#f5a731] mb-12 font-bold">
        Customer Reviews
      </h2>

      {/* Carousel container */}
      <div className="relative w-full max-w-3xl overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fakeReviews.map((rev, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-4">
              <div className="bg-[#121218] text-white p-6 rounded-xl shadow-lg h-[350px] pt-[3rem]">
                <strong className="text-[#eec58f] text-lg text-center ml-[15rem] md:text-xl">{rev.name}</strong>
                <p className="text-gray-200 text-md mt-2">{rev.comment}</p>
                <p className="text-yellow-300 text-md mt-1">{rev.email}</p>
                <div className="mt-3">{renderStars(rev.rating)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevReview}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#915f04] text-white p-3 rounded-full shadow-lg hover:bg-yellow-800  cursor-pointer transition"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextReview}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#915f04] text-white p-3 rounded-full shadow-lg hover:bg-yellow-800 cursor-pointer  transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
