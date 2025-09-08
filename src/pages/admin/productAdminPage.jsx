import axios from "axios";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { BiTrash, BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import PaginatorBtn from "../../components/paginatorbtn";

export default function ProductsAdminPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  // Fetch products function
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/allproducts/${page}/${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on page change
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Delete product handler
  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product Deleted Successfully");
      fetchProducts(); // Refresh products for current page
    } catch (error) {
      console.error(error);
      toast.error("Failed To Delete Product");
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="overflow-x-auto w-full pt-[40px] px-[50px]">
        <h1 className="text-[30px] font-bold">Products List</h1>
        <Link
          to="/admin/newproduct"
          className="fixed top-4 right-[50px] flex flex-row items-center gap-[2px] bg-[#256947] text-white px-[10px] py-[5px] rounded-lg"
        >
          <GoPlus className="text-2xl" />
          <span className="text-center mb-[3px] mr-[2px]">Create New</span>
        </Link>

        {loading ? (
          <Loading />
        ) : (
          <table className="w-full my-4">
            <thead className="border-2 border-[#152f22]">
              <tr className="bg-[#082919] text-white">
                <th className="text-[21px] px-[7px] text-center font-medium">Image</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Product Id</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Product Name</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Price</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Labelled Price</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Category</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Stock</th>
                <th className="text-[21px] p-[7px] text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="border-2 border-gray-300">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="p-[10px]">
                    <img src={product.images[0]} alt={product.productimage} className="w-[50px] h-[50px]" />
                  </td>
                  <td className="p-[7px] text-center">{product.productId}</td>
                  <td className="p-[7px] text-center">{product.productname}</td>
                  <td className="p-[7px] text-center">{product.price}</td>
                  <td className="p-[7px] text-center">{product.labelledPrice}</td>
                  <td className="p-[7px] text-center">{product.category}</td>
                  <td className="p-[7px] text-center">{product.stock}</td>
                  <td className="px-[7px] pt-[15px] flex justify-center items-center">
                    <BiTrash
                      className="text-3xl text-red-700 cursor-pointer ml-[10px]"
                      onClick={() => handleDelete(product.productId)}
                    />
                    <BiEdit
                      className="text-3xl text-[#152f22] cursor-pointer ml-[10px]"
                      onClick={() => navigate("/admin/update", { state: product })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <PaginatorBtn page={page} totalPages={totalPages} onPageChange={setPage} setLoading={setLoading} />
    </div>
  );
}
