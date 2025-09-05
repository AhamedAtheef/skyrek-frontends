import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="w-full min-h-0 h-auto flex flex-col items-center gap-[5rem] mt-[5rem]  relative">
            <div className="w-full h-full px-[1rem] md:px-[2rem] 2xl:px-[3rem] md:mt-[1.5rem]">
                <h1 className="text-center text-[30px] md:text-4xl lg:text-5xl xl:text-5xl 2xl:mb-[0.75rem] lg:mt-[0.5rem] font-semibold text-[#f1c36c]">About Us</h1>
                 <p className="text-center text-[18px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:mb-[0.75rem] lg:mt-[0.5rem] font-semibold text-black tracking-wider">Your Journey to <span className="text-[#aa7849] font-bold">Effortless Elegance</span></p>
                    <p className="2xl:hidden text-[16px] mt-2.5 md:text-[18px] lg:text-[25px] xl:text-[1.75rem] text-black">At <span className="text-[#4e2f15] font-semibold">CBC Cosmetics</span>, we believe beauty begins with confidence. Our products are 
                        meticulously crafted with unwavering care, combining premium ingredients and cutting-edge trends 
                        to help you unleash your true radiance. Whether it's skincare or makeup, we're here to help you discover your unique glow and feel your most authentic, beautiful 
                    self every single day. We are committed to empowering you on your personal beauty journey, ensuring you not only look good, but feel unstoppable.</p>
                    <p className="hidden 2xl:block text-[16px] mt-2.5 xl:text-[1.5rem] text-black">At <span className="text-[#4e2f15] font-semibold">CBC Cosmetics</span>, we believe beauty begins with confidence and the profound power of self-expression. Our products are meticulously crafted with unwavering care, 
                        combining premium ingredients, sustainable sourcing, and cutting-edge cosmetic science to help you unleash your true radiance. We stay ahead of industry trends, 
                        creating innovative formulas that feel as good as they look. Whether it's skincare or makeup, we're here to help you discover your unique glow, providing you with 
                        the tools to feel your most authentic, beautiful self every single day. We are deeply committed to empowering you on your personal beauty journey, ensuring you not 
                        only look good, but feel absolutely unstoppable and confident in your own skin. This is more than just 
                        a brand; it's a movement dedicated to celebrating your individuality and supporting you every step of the way</p>
            <Link className="absolute top-[28.25rem] md:top-[20rem] lg:top-[23rem] 2xl:top-[25rem] left-[1rem] 2xl:left-[3rem] text-[18px] md:text-2xl lg:text-3xl xl:text-2xl 2xl:mb-[0.75rem] lg:mt-[0.5rem] font-semibold text-[#f1dfbe] tracking-wider cursor-pointer shadow-lg px-[0.5rem] py-[0.25rem] bg-[#2c1e03] rounded-2xl" to="/user/home">Back To Home</Link>
            </div>
            <div className=" hidden md:flex flex-col md:mt-[2rem]  mb-[3rem] 2xl:mb-[15rem] justify-center items-center gap-[2rem] md:text-4xl lg:text-5xl xl:text-5xl  lg:mt-[0.5rem] font-semibold text-[#f1c36c] w-full h-full ">
                 <h1>Top-Rated Products</h1>
                 <div className="w-full h-[500px] xl:px-[8rem] 2xl:px-[10rem] ">
                    <video src="/slide.mp4" autoPlay loop muted playsInline className="w-full h-[490px] 2xl:h-[640px] object-contain xl:object-fill"></video>
                 </div>
            </div>
        </div>
    );
}