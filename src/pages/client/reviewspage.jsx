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
        <div className="max-w-lg  mx-auto md:mx-0 p-4 mt-[20%] md:mt-[10%]">
            <h2 className="text-2xl md:text-3xl md:ml-[13.5rem] mb-4 text-center tracking-wider text-[#e7a01c]" id="premiumtext">Customer Reviews</h2>
            <div className=" md:w-[90%] h-[500px] md:py-[1rem] md:px-[1.25rem] md:ml-[0.5rem] flex flex-col gap-2  md:flex-wrap md:gap-3  mb-[2rem] overflow-y-scroll ">
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((rev) => (
                    <div
                        key={rev._id}
                        className=" p-3 rounded shadow-lg"
                    >
                        <div className="flex flex-col justify-between  mb-1">
                            <strong className="text-center tracking-wider font-serif text-[#583609]">{rev.name}</strong>
                            <p className="text-gray-800 mt-[2px]">{rev.comment}</p>
                            <p className="text-sm text-gray-400">{rev.email}</p>
                        </div>
                           {renderStars(rev.rating)}
                    </div>
                ))}
            </div>
            <h1 className="text-2xl md:text-3xl mb-4 md:ml-[11.5rem] text-center tracking-wider text-[#130d02]">Submit Your Review</h1>
            <div className="md:w-[100%] md:ml-[8rem]">
                <form onSubmit={submitReview} className="flex flex-col gap-2 md:gap-[1rem] mb-6 ">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 md:py-[0.5rem] rounded-3xl bg-[#f0cd8b88]  placeholder:text-gray-800 focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 md:py-[0.5rem] rounded-3xl bg-[#f0cd8b8c]  placeholder:text-gray-800 focus:outline-none"
                />
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 md:py-[0.5rem] rounded-3xl bg-[#f0cd8b8c]  placeholder:text-gray-800 focus:outline-none"
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
                    className="border p-2 md:py-[1rem] rounded-2xl bg-[#e0ba738c]  placeholder:text-gray-800 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-[#302004] text-white p-2 tracking-wider  rounded-[15px] hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
            </div>
        </div>
    );
}
