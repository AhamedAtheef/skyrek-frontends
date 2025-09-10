import { useState, useEffect } from "react";

const fakeReviews = [
  { name: "Sophia Lee", email: "sophia@example.com", rating: 5, comment: "Absolutely love CBC Cosmetics! My skin has never looked better." },
  { name: "Emma Johnson", email: "emma.johnson@example.com", rating: 4, comment: "Great products and amazing customer service!" },
  { name: "Olivia Brown", email: "olivia.brown@example.com", rating: 5, comment: "High-quality makeup and skincare. Totally recommend!" },
  { name: "Mia Williams", email: "mia.williams@example.com", rating: 5, comment: "Beautiful packaging and outstanding formulas!" },
];

export default function MobileReviews() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // trigger animation after mount
  }, []);

  const renderStars = (num) => {
    const filled = "★".repeat(num);
    const empty = "☆".repeat(5 - num);
    return <span className="text-amber-100 text-lg md:text-xl">{filled}{empty}</span>;
  };



  return (
    <div className="w-full bg-[#fff4e0] py-16 px-4 md:px-8 flex flex-col items-center relative">
      <h2 className="text-3xl md:text-4xl text-center text-[#f5a731] mb-12 font-bold">
        Customer Reviews
      </h2>

      {/* Mobile (stacked with animation) */}
      <div className="flex flex-col gap-6 lg:hidden w-full">
        {fakeReviews.map((rev, idx) => (
          <div
            key={idx}
            className={`bg-[#121218] text-white p-6 rounded-xl shadow-lg w-full transform transition-all duration-700 ease-out ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <strong className="text-[#eec58f] text-lg">{rev.name}</strong>
            <p className="text-gray-200 text-sm mt-2">{rev.comment}</p>
            <p className="text-yellow-300 text-xs mt-1">{rev.email}</p>
            <div className="mt-3">{renderStars(rev.rating)}</div>
          </div>
        ))}
      </div>


    </div>
  );
}
