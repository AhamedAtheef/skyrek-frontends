import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import BarLoader from "../../components/homeloading";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export default function Contact() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setmessage] = useState("");
    const [loading, setLoading] = useState(false);
    function SendMessage() {

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/message", {
            fullname: fullname,
            email: email,
            subject: subject,
            message: message
        }).then((res) => {
            toast.success(res.data.message);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            toast.error("Failed To Send Message Try Again");
            setLoading(false);
        })
    }
    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#faf9f6]">
            <div className="w-full h-full mt-[5rem] md:mt-[6rem] px-[1rem] md:px-[2rem] 2xl:px-[3rem] ">
                <h1 className="text-center text-[30px] md:text-4xl lg:text-5xl font-semibold text-[#f1c36c]">
                    Contact Us
                </h1>
            </div>
            {loading ? <BarLoader /> : <div className="w-full h-full mt-[1rem] px-[1rem] md:px-[2rem] xl:px-[3rem] 2xl:px-[4rem] md:flex">
                <form action="submit" onSubmit={(e) => { e.preventDefault(); setLoading(true); SendMessage(); }} className="w-full h-full flex flex-col lg:gap-2">
                    <label htmlFor="name" className="text-[18px] lg:text-2xl tracking-wider">Full Name</label>
                    <input type="text" onChange={(e) => setFullname(e.target.value)} placeholder="Ex jhone" required id="name" className="border-1 w-[100%] lg:text-xl md:w-[90%] xl:w-[80%] 2xl:w-[70%]  mt-[5px] rounded-2xl  bg-[#dfcdad70] placeholder:text-gray-700 border-gray-400 px-[20px] py-[5px] xl:py-[10px] mb-[0.5rem] focus:outline-1" />
                    <label htmlFor="email" className="text-[18px] lg:text-2xl tracking-wider">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required id="email" className="border-1 w-[100%] lg:text-xl md:w-[90%] xl:w-[80%] 2xl:w-[70%]  mt-[5px] rounded-2xl  bg-[#dfcdad70] placeholder:text-gray-700 border-gray-400 px-[20px] py-[5px] xl:py-[10px] mb-[0.5rem] focus:outline-1" />
                    <label htmlFor="subject" className="text-[18px] lg:text-2xl tracking-wider">Subject</label>
                    <input type="text" onChange={(e) => setSubject(e.target.value)} placeholder="Enter here.." required id="subject" className="border-1 w-[100%] lg:text-xl md:w-[90%] xl:w-[80%] 2xl:w-[70%]  mt-[5px] rounded-2xl  bg-[#dfcdad70] placeholder:text-gray-700 border-gray-400 px-[20px] py-[5px] xl:py-[10px] mb-[0.5rem] focus:outline-1" />
                    <label htmlFor="message" className="text-[18px] lg:text-2xl tracking-wider">Message</label>
                    <textarea placeholder="Enter your message" required onChange={(e) => setmessage(e.target.value)} id="message" className="border-1 w-[100%] lg:text-xl md:w-[90%] xl:w-[80%] 2xl:w-[70%]   min-h-[100px] lg:min-h-[150px] h-auto  mt-[5px] rounded-2xl  bg-[#dfcdad70] placeholder:text-gray-700 border-gray-400 px-[20px] py-[5px] mb-[0.5rem] focus:outline-1"></textarea>
                    <button type="submit" className="bg-[#8a7c5d]  md:ml-[1.5rem] xl:ml-[4rem] mt-[2rem] px-[6rem]  md:w-[320px] lg:w-[400px] xl:w-[500px] md:px-[2rem] lg:py-2 lg:text-2xl  py-1 rounded-3xl text-[20px] shadow-2xl text-black tracking-wide cursor-pointer">Send</button>
                </form>
                <div className="hidden md:block w-[70%] lg:w-[60%] xl:w-[70%] h-[400px] lg:h-[460px] xl:h-[500px] 2xl:h-[580px] mt-[2rem] 2xl:mr-[2rem]">
                    <img src="/facepic1.jpg" alt="" className="w-full h-full rounded-tr-4xl rounded-bl-4xl animate-slideUp" />
                </div>
            </div>}
            <div className="w-full min-h-[200px] h-auto mt-[3rem]  flex flex-col lg:flex-row justify-center px-[1rem] lg:px-[1.5rem] lg:mt-[7rem] xl:px-[4rem] gap-[2rem] xl:gap-[4rem] py-[2rem] items-center">
                
                <div className="w-[80%] md:w-[70%] xl:w-[25%] py-[1rem]  min-h-[100px] h-auto rounded-[8px] text-black border border-amber-400 flex flex-col justify-center items-center review-card ">
                    <div className="bg-black rounded-full p-3 text-center text-[#caad5d] text-[1.25rem]"><FaLocationDot /></div>
                    <h1 className="text-[18px] xl:text-[22px] md:mt-[0.75rem] tracking-wide text-[#8a7c4d]">Address</h1>
                    <p className="text-[17px] xl:text-[20px] tracking-wide text-gray-700">Colombo 12 main Street</p>
                </div>

                <div className="w-[80%] md:w-[70%] xl:w-[25%] py-[1rem]  min-h-[100px] h-auto rounded-[8px] text-black border border-amber-400 flex flex-col justify-center  items-center review-card ">
                    <div className="bg-black rounded-full p-3 text-center text-[#caad5d] text-[1.25rem]"><FaPhone /></div>
                    <h1 className="text-[18px] xl:text-[22px] md:mt-[0.75rem] tracking-wide text-[#8a7c4d]">Phone</h1>
                    <p className="text-[17px] xl:text-[20px] tracking-wide text-gray-700">+94 112 345 678</p>
                </div>

                <div className="w-[80%] md:w-[70%] xl:w-[25%] py-[1rem]  min-h-[100px] h-auto rounded-[8px] text-black border border-amber-400 flex flex-col justify-center items-center review-card ">
                    <div className="bg-black rounded-full p-3 text-center text-[#caad5d] text-[1.50rem]"><MdAttachEmail /></div>
                    <h1 className="text-[18px] xl:text-[22px] md:mt-[0.75rem] tracking-wide text-[#8a7c4d]">Email</h1>
                    <p className="text-[17px] xl:text-[20px] tracking-wide text-gray-700">cbccosmetic12@gmail.com</p>
                </div>
            </div>

        </div>

    );
}