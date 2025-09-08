import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BarLoader from "../../components/homeloading";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

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
        setShowForm(false)
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
            <span className="text-yellow-500 text-[20px]">{filled}{empty}</span>
        );
    };

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div className="w-full min-h-screen bg-black flex gap-2 justify-center relative">
            <div className="w-full max-w-[1200px] xl:max-w-[1300px] 2xl:max-w-[1800px] p-4 mt-[20%] md:mt-[10%] lg:mt-[10%] xl:mt-[5%]">

                {/* Customer Reviews */}
                <h2 className="text-2xl md:text-3xl mb-4 xl:mb-[2rem] xl:text-[3rem] text-center tracking-wider text-[#fdb42d]" id="premiumtext">
                    Customer Reviews
                </h2>

                {loading ? <BarLoader /> : <div className="w-full lg:min-w-[800px]  xl:min-w-[900px] 2xl:min-w-[1800px] h-[500px] flex flex-col gap-2 lg:gap-4 lg:flex-row lg:flex-wrap overflow-y-auto px-4 md:px-0">
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews.map((rev) => (
                        <div
                            key={rev._id}
                            className="p-4 bg-[#121218] lg:w-[48%] 2xl:w-[32%] lg:h-[200px] lg:overflow-y-auto rounded shadow-lg mb-4"
                        >
                            <div className="flex flex-col justify-between mb-2 ">
                                <strong className="text-center tracking-wider font-serif text-[#eec58f]">{rev.name}</strong>
                                <p className="text-gray-100 mt-[2px] break-words whitespace-normal">{rev.comment}</p>
                                <p className="text-sm text-yellow-300">{rev.email}</p>
                            </div>
                            {renderStars(rev.rating)}
                        </div>
                    ))}
                </div>}

                <button className=" text-[#e7a01c] border border-[#f5e2c0] hover:bg-[#e9a424] cursor-pointer hover:text-white transition 
                 duration-300 ease-in-out rounded-full px-4 py-2 mt-[1rem]" onClick={() => setShowForm(true)}>Enter Your Review</button>
                {showForm && <div className="absolute bottom-[10%] right-[4%] min-w-[280px] sm:min-w-[320px] min-[360px]:right-[50%] min-[360px]:translate-x-[50%] min-[360px]:min-w-[340px] min-[390px]:min-w-[360px]
                 md:min-w-[500px] lg:min-w-[700px] lg:pr-[5rem]  bg-opacity-40 backdrop-blur-md px-[2rem] py-[1rem] rounded-3xl shadow-lg overflow-y-auto">
                    {/* Submit Review */}
                    <h1 className="text-2xl md:text-3xl mt-8 mb-4 text-center tracking-wider text-[#f1ab28]">
                        Submit Your Review
                    </h1>
                    <button
                        className="absolute cursor-pointer top-[0.25rem] text-[20px] font-semibold text-red-700 right-[0.5rem] hover:text-red-500 transition duration-300 ease-in-out rounded-full px-4 py-2"
                        onClick={() => setShowForm(false)}
                    >
                        X
                    </button>
                    <div className="w-full flex justify-center ">
                        <form
                            onSubmit={submitReview}
                            className="flex flex-col gap-3 md:gap-4 2xl:mr-[8rem] w-full max-w-lg"
                        >
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border p-2 lg:text-[20px] text-yellow-400 border-amber-200 md:py-[0.5rem] lg:w-[35rem] 2xl:w-[40rem] lg:pl-[15px] rounded-2xl  placeholder:text-yellow-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 lg:text-[20px] text-yellow-400 border-amber-200 md:py-[0.5rem] lg:w-[35rem] 2xl:w-[40rem] lg:pl-[15px] rounded-2xl  placeholder:text-yellow-500 focus:outline-none"
                            />
                          <div className="flex items-center">
                            <label htmlFor="rating" className="text-yellow-100  xl:text-[20px]">Rating :-</label>
                              <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className=" p-2 lg:text-[20px] cursor-pointer text-yellow-400  md:py-[0.5rem]   lg:pl-[15px] rounded-2xl  placeholder:text-yellow-500 focus:outline-none"
                            >
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r} className="bg-black " id="rating">
                                        {r}
                                    </option>
                                ))}
                            </select>
                          </div>
                            <textarea
                                placeholder="Your Review"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                className="border p-2 lg:text-[20px] text-yellow-400 border-amber-200 md:py-[1rem] lg:w-[35rem] 2xl:w-[40rem] lg:min-h-[200px] xl:h-auto lg:pl-[15px] rounded-2xl  placeholder:text-yellow-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-[#80600b] text-white p-2 lg:w-[30rem] 2xl:w-[35rem]  lg:ml-[2.5rem] lg:text-[20px] tracking-wider rounded-[15px] hover:bg-[#faad32] hover:text-black cursor-pointer transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                }
            </div>
        </div>

    );
}
