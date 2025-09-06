import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
            setReviews(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch reviews. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/reviews", { name, email, rating, comment });
            setName(""); setEmail(""); setComment(""); setRating(5);
            toast.success("Review submitted successfully.");
            await fetchReviews(); // fetch updated reviews
        } catch (err) {
            console.error(err);
            setError("Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };

    // Convert rating number to stars
    const renderStars = (num) => {
        const filled = "★".repeat(num);
        const empty = "☆".repeat(5 - num);
        return (
            <span className="text-yellow-500">{filled}{empty}</span>
        );
    };

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div className="w-full min-h-screen flex gap-2 justify-center">
            <div className="w-full max-w-[1200px] xl:max-w-[1300px] 2xl:max-w-[1800px] p-4 mt-[20%] md:mt-[10%] lg:mt-[10%] xl:mt-[5%]">

                {/* Customer Reviews */}
                <h2 className="text-2xl md:text-3xl mb-4 xl:mb-[2rem] xl:text-[3rem] text-center tracking-wider text-[#e7a01c]" id="premiumtext">
                    Customer Reviews
                </h2>

                <div className="w-full lg:min-w-[800px] xl:min-w-[900px] 2xl:min-w-[1800px] h-[500px] flex flex-col gap-2 lg:gap-4 lg:flex-row lg:flex-wrap overflow-y-scroll px-4 md:px-0">
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews.map((rev) => (
                        <div
                            key={rev._id}
                            className="p-4 lg:w-[48%] 2xl:w-[32%] lg:h-[200px] lg:overflow-y-scroll rounded shadow-lg mb-4"
                        >
                            <div className="flex flex-col justify-between mb-2">
                                <strong className="text-center tracking-wider font-serif text-[#583609]">{rev.name}</strong>
                                <p className="text-gray-800 mt-[2px]">{rev.comment}</p>
                                <p className="text-sm text-gray-400">{rev.email}</p>
                            </div>
                            {renderStars(rev.rating)}
                        </div>
                    ))}
                </div>


                {/* Submit Review */}
                <h1 className="text-2xl md:text-3xl mt-8 mb-4 text-center tracking-wider text-[#130d02]">
                    Submit Your Review
                </h1>

                <div className="w-full flex justify-center ">
                    <form onSubmit={submitReview} className="flex flex-col gap-3 md:gap-4 2xl:mr-[8rem] w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border p-2 lg:text-[20px] md:py-[0.5rem] lg:w-[35rem] 2xl:w-[40rem] lg:pl-[15px] rounded-3xl bg-[#f0cd8b88] placeholder:text-gray-800 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 lg:text-[20px] md:py-[0.5rem] lg:w-[35rem] 2xl:w-[40rem] lg:pl-[15px] rounded-3xl bg-[#f0cd8b8c] placeholder:text-gray-800 focus:outline-none"
                        />
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border p-2 lg:text-[20px] md:py-[0.5rem] lg:w-[35rem] 2xl:w-[40rem] lg:pl-[15px] rounded-3xl bg-[#f0cd8b8c] placeholder:text-gray-800 focus:outline-none"
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Your Review"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            className="border p-2 lg:text-[20px] md:py-[1rem] lg:w-[35rem] 2xl:w-[40rem]  lg:pl-[15px] rounded-2xl bg-[#e0ba738c] placeholder:text-gray-800 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#302004] text-white p-2 lg:w-[30rem] 2xl:w-[35rem] lg:ml-[2.5rem] lg:text-[20px] tracking-wider rounded-[15px] hover:bg-[#0e0901] cursor-pointer transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}
