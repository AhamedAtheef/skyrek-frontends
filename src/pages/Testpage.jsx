import { useState } from "react"
import UploadFile from "../utils/meadiaupload"
import toast from "react-hot-toast"
import Loading from "../components/loading"
import BarLoader from "../components/homeloading"
import ProductCard from "../components/productcard"
import axios from "axios"

 
export default function Testpage(){
const token = localStorage.getItem("token");

axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
  headers: {
    Authorization: `Bearer ${token}`, // or just token if backend expects plain
  },
})
.then((res) => {
  console.log(res.data);
})
.catch((err) => {
  console.error("Error fetching user:", err);
});

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <BarLoader/>
        </div>
    )
}