import { Link } from "react-router-dom";

export default function HomeBtn(){
    return(
        <div className="w-full h-full flex flex-col gap-2 text-2xl justify-center items-center">
            <h1>404 Not Found</h1>
            <Link to="/user/home" className="bg-[#000000] hover:bg-[#000000b1] text-white px-5 py-2 rounded-full text-[18px] shadow-lg cursor-pointer">
          Back To Home
        </Link>
        </div>
    )
}