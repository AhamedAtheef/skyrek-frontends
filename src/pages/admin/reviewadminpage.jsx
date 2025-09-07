import { useState, useEffect } from "react";
import axios from "axios";
import { TbTrashFilled } from "react-icons/tb";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function ReviewAdminPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
            .then((res) => {
                setReviews(res.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    function handleDelete(review) {
        console.log(review);
        setLoading(true);
        const name = review.name;
        const email = review.email;

        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${name}/${email}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Review deleted successfully.");

                // Fetch reviews again to refresh list
                axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
                    .then((res) => {
                        setReviews(res.data || []);
                        setLoading(false);
                    })
                    .catch(() => 
                        toast.error("Failed to delete review."),
                        setLoading(false));
            })
            .catch(() => setLoading(false));
    }

    return (
        <div className="w-full h-screen flex flex-col px-[1rem]">
            {/* Header */}
            <div className="w-full pt-6 pl-[1.5rem] ">
                <h1 className="text-3xl font-bold text-gray-800">Customer Reviews</h1>
            </div>

            <div className="flex-1 overflow-y-scroll p-6">
                {loading ? (
                    <Loading />
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="grid gap-4 ">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="relative p-4 border rounded-xl shadow-sm bg-white"
                            >
                                <h2 className="font-semibold text-lg text-gray-700">
                                    {review.name}
                                </h2>
                                <p className="text-sm text-green-600">{review.email}</p>
                                <p className="mt-2 text-gray-600">{review.comment}</p>
                                <p className="mt-1 text-yellow-500 font-medium">
                                    ⭐ {review.rating}
                                </p>
                                <p className="mt-1 text-sm text-gray-800">{new Date(review.createdAt).toLocaleString()}</p>
                                <p className="absolute bottom-2 right-2"><TbTrashFilled className="text-red-700 hover:text-red-600 cursor-pointer" onClick={() => handleDelete(review)}
                                /></p>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
