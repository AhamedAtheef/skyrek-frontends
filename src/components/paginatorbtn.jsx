export default function PaginatorBtn(props) {
  const { page, totalPages, onPageChange, setLoading } = props; // destructuring props

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => {
          setLoading(true);
          onPageChange(page - 1);
        }}
        disabled={page === 1}
        className={`px-4 py-2 rounded ${
          page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#198643] cursor-pointer text-white"
        }`}
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => {
          setLoading(true);
          onPageChange(page + 1);
        }}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded ${
          page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#198643] cursor-pointer text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
