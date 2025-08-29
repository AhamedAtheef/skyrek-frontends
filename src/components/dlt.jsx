import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { deleteAllImages } from "../utils/media delete";

export default function DeleteAllImagesButton() {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAllImages();
    } catch (error) {
      // error handled in deleteAllImages with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto text-center">
      <Toaster />
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete All Images"}
      </button>
    </div>
  );
}
