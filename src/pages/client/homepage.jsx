import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function HomePage() {
    const [selectedImg, setSelectedImg] = useState(null);
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-screen bg-[#0c0c0e] mx-auto flex flex-col overflow-hidden">
            <div className="w-full h-[250px] md:h-[450px] xl:h-[500px] 2xl:h-[620px] mt-[4.25rem] bg-black mx-auto relative overflow-hidden">
                <video
                    src="/bgcover.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                ></video>


                <div className="lg:hidden absolute top-[1rem] md:top-[2rem] px-[2rem] md:px-[6rem] w-full h-full">
                    <h1 className="text-[23px] pb-[10px] min-[370px]:text-3xl md:text-5xl font-bold
                        bg-gradient-to-r from-[#f8f3d4] via-[#f0da98] to-[#eba04c]
                        bg-clip-text text-transparent drop-shadow-lg
                        animate-slide-shimmer">
                        Welcome To CBC Web Page
                    </h1>
                    <p className=" mt-[0.25rem] text-[18px] min-[370px]:text-2xl min-[420px]:text-2xl font-mono text-[#f7f7f7] md:bg-amber-200 md:text-black md:rounded-full md:mt-[1rem]   slide-shimmer">
                        Glow With Confidence Shop With Trust
                    </p>
                    <div className="w-full hidden md:block">
                        <p className="text-[25px] tracking-wider mt-[2px] font-serif text-[#f7f7f7] slide-shimmer">
                            Nourish and protect your skin naturally with organic ingredients. Gentle, effective, and safe for healthy, glowing, beautiful skin daily.
                        </p>
                    </div>
                    <button className="px-4 py-0.5 min-[420px]:px-6 md:px-8 md:py-3 mt-2 md:mt-[2rem] text-lg md:text-3xl font-semibold rounded-[18px] border-2 border-[#d4cfae] bg-white/20 backdrop-blur-md text-[20px] text-center
                        text-[#ccc075] cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300 animate-slide-shimmer" onClick={()=> navigate("/user/products")}>
                        Shop Now
                    </button>
                </div>

                {/* lg section */}
                <div className="w-full h-full hidden lg:block">
                    <div className="hidden lg:block absolute top-[5rem] left-[6rem] px-[2rem]">
                        <div>
                            <h1 className="text-4xl xl:text-5xl pb-[10px] font-bold
                                bg-gradient-to-r from-[#f8f3d4] via-[#f0da98] to-[#eba04c]
                                bg-clip-text text-transparent drop-shadow-lg typewriter">
                                Welcome To CBC Web Page
                            </h1>
                            <div className="w-full flex flex-col">
                                <p className=" text-[30px] mt-[2px] font-mono text-[#f7f7f7] slide-shimmer">
                                    Natural SkinCare
                                </p>
                                <p className=" tracking-widest  mt-[2px] text-[#f7f7f7] slide-shimmer" id="hometext">
                                    The Health
                                </p>
                                <p className=" tracking-widest  text-[#f7f7f7] slide-shimmer" id="hometext">
                                    Of Your Skin.
                                </p>
                            </div>
                        </div>

                        <button className="px-4 py-2 mt-3 md:mt-[2.5rem] lg:mt-[15px] 2xl:mt-[2rem] xl:px-[5rem] text-lg md:text-3xl xl:text-4xl font-semibold rounded-[18px] border-2 border-[#d4cfae] bg-white/20 backdrop-blur-md text-[20px] text-center
                            text-[#eee294] shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer animate-slide-shimmer" onClick={()=> navigate("/user/products")}>
                            Shop Now
                        </button>
                    </div>
                </div>


                <div className="hidden w-[650px] h-full xl:block absolute top-0 right-[0.25rem]">
                    <img src="/girl.png" alt="" />
                </div>
            </div>


            <div className="w-full min-h-0 pb-[2rem] h-auto flex flex-col bg-[#faedd1] pt-[0.25rem] gap-[1rem] md:gap-[2rem] relative">
                <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider text-[#000000] lg:mt-[5px]">
                    Our <span className="text-[#b37f31] md:text-4xl lg:text-5xl" id="premiumtext">Premium</span> Collections
                </h1>
                <div className="flex flex-wrap gap-[0.5rem] pl-[0.25rem] min-[370px]:justify-around min-[370px]:px-[1rem] md:gap-[1rem]">
                    <img onClick={() => setSelectedImg("/CBC1.jpg")} src="/CBC1.jpg" alt="" className="xl:hidden w-[150px] min-[370px]:w-[160px] md:w-[320px] lg:w-[460px]  h-[150px] md:h-[280px] cursor-pointer  rounded-3xl fade-slide-up" />
                    <img onClick={() => setSelectedImg("/CBC2.jpg")} src="/CBC2.jpg" alt="" className="xl:hidden w-[150px] min-[370px]:w-[160px] md:w-[320px] lg:w-[460px]  h-[150px] md:h-[280px] cursor-pointer  rounded-3xl fade-slide-up" />
                    <img onClick={() => setSelectedImg("/CBC4.jpg")} src="/CBC4.jpg" alt="" className="xl:hidden w-[150px] min-[370px]:w-[160px] md:w-[320px] lg:w-[460px]  h-[150px] md:h-[280px] cursor-pointer  rounded-3xl fade-slide-up" />
                    <img onClick={() => setSelectedImg("/CBC5.jpg")} src="/CBC5.jpg" alt="" className="xl:hidden w-[150px] min-[370px]:w-[160px] md:w-[320px] lg:w-[460px]  h-[150px] md:h-[280px] cursor-pointer  rounded-3xl fade-slide-up" />

                    {/* xl section */}
                    <div className="overflow-hidden w-full hidden xl:block">
                        <div className="flex gap-4 2xl:gap-[2.5rem] slide-animation">
                            <img onClick={() => setSelectedImg("/CBC1.jpg")} src="/CBC1.jpg" alt="" className="xl:w-[580px] 2xl:w-[440px] xl:h-[360px] cursor-pointer rounded-3xl" />
                            <img onClick={() => setSelectedImg("/CBC2.jpg")} src="/CBC2.jpg" alt="" className="xl:w-[580px] 2xl:w-[440px] xl:h-[360px] cursor-pointer rounded-3xl" />
                            <img onClick={() => setSelectedImg("/CBC4.jpg")} src="/CBC4.jpg" alt="" className="xl:w-[580px] 2xl:w-[440px] xl:h-[360px] cursor-pointer rounded-3xl" />
                            <img onClick={() => setSelectedImg("/CBC5.jpg")} src="/CBC5.jpg" alt="" className="xl:w-[580px] 2xl:w-[440px] xl:h-[360px] cursor-pointer rounded-3xl" />
                        </div>
                    </div>
                </div>

                {/* overlay  */}
                {selectedImg && (
                    <div className="w-full h-full bg-[#05050498] absolute top-0 left-0 items-center justify-center hidden md:flex">
                        <div className="relative bg-white w-[90%] max-w-[450px] h-[420px] rounded-lg shadow-lg ">
                            <img
                                src={selectedImg}
                                alt="Selected"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedImg(null)}
                                className="absolute -top-9 -right-8 bg-red-600 text-white rounded-full px-3 py-1 cursor-pointer"
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}

            </div>
            {/* category */}
            <div className=" flex flex-col items-center gap-5 justify-center w-full min-h-0 h-auto bg-[#fce5c8] py-[1rem]">
                <h1 className="text-3xl text-[#744a13] md:text-4xl lg:text-5xl xl:text-6xl tracking-wider" id="premiumtext">Category</h1>
                <Link to={"/user/products"}>
                    <div className="flex gap-5 md:gap-[2.5rem] xl:gap-[8rem] cursor-pointer">
                        <div>
                            <img src="/catgory2.jpg" alt="" className="w-[80px] lg:w-[100px] xl:w-[200px] h-[80px] lg:h-[100px] xl:h-[200px] rounded-full" />
                            <h1 className="text-center md:text-[17px] lg:text-[25px] xl:text-[2rem] font-semibold tracking-wider">Face Cream</h1>
                        </div>
                        <div>
                            <img src="/catgory4.jpg" alt="" className="w-[80px] lg:w-[100px] xl:w-[200px] h-[80px] lg:h-[100px] xl:h-[200px] rounded-full" />
                            <h1 className="text-center md:text-[17px] lg:text-[25px] xl:text-[2rem] font-semibold tracking-wider">Hair gel</h1>
                        </div>
                        <div className="ml-[10px] lg:ml-[20px] xl:ml-0">
                            <img src="/catgory1.jpg" alt="" className="w-[80px] lg:w-[100px] xl:w-[200px] h-[80px] lg:h-[100px] xl:h-[200px] rounded-full" />
                            <h1 className="text-center md:text-[17px] lg:text-[25px] xl:text-[2rem] font-semibold tracking-wider">Pimple Oil</h1>
                        </div>
                        <div className="hidden md:block">
                            <img src="/catgory.jpg" alt="" className="w-[80px]  lg:w-[100px] xl:w-[200px] h-[80px]  lg:h-[100px] xl:h-[200px]  rounded-full" />
                            <h1 className="text-center md:text-[17px] lg:text-[25px] xl:text-[2rem] font-semibold tracking-wider">Eye Brow</h1>
                        </div>
                    </div></Link>
            </div>
            {/* About */}
            <div className="w-full min-h-0 h-auto flex flex-col pt-[1rem] pb-[1rem] md:flex-row md:px-[3rem] md:py-[4rem] justify-center items-center xl:items-start bg-white relative" id="about">
                <div className="hidden w-full h-full  md:flex justify-center ">
                    <img src="/about.png" alt="" className="object-cover h-[280px] w-[380px] lg:h-[320px] lg:w-[480px] xl:h-[420px] xl:w-[580px] rounded-bl-4xl rounded-tr-4xl lg:rounded-bl-[3.75rem] lg:rounded-tr-[3.75rem] animate-slideUp " />
                </div>
                {/* intro */}
                <div className="text-center px-[1rem] w-full h-full flex flex-col justify-center items-center xl:mb-[5rem] ">
                    <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:mb-[1rem] font-bold md:font-semibold md:tracking-wider text-[#f7cb89]">About Us</h1>
                    <p className="text-[20px] md:text-2xl lg:text-3xl xl:text-5xl 2xl:mb-[0.75rem] lg:mt-[0.5rem] font-semibold text-black tracking-wider">Your Journey to <span className="text-[#aa7849] font-bold">Effortless Elegance</span></p>
                    <p className="2xl:hidden text-[16px] mt-2.5 md:text-[18px] lg:text-[20px] xl:text-[1.75rem] text-black">At <span className="text-[#201307] font-semibold">CBC Cosmetics,</span> we believe beauty begins with confidence. Our products are crafted with care, combining quality ingredients and modern trends to
                        help you look and feel your best. Whether it’s skincare or makeup, we are here to bring out your natural glow <br></br>
                        <Link to="/user/about" className="text-[1.25rem] cursor-pointer"><span className="text-[#aa7849]">Read More</span></Link></p>
                    <p className="hidden 2xl:block text-[1.50rem]  text-black">At <span className="text-[#201307] font-semibold">CBC Cosmetics, </span>we believe that true beauty begins with confidence. Every product we create is carefully crafted using high-quality ingredients and innovative formulas to bring out your natural glow. From luxurious skincare to vibrant makeup,
                        our collection is designed to help you look and feel your best every day.
                        We are passionate about empowering individuals to express their unique style, embrace self-care, and enjoy a
                        beauty routine that makes them shine inside and out. With CBC Cosmetics, beauty is not just what you wear—it’s how you feel.<br></br>
                        <Link to="/user/about" className="text-[1.25rem] font-semibold cursor-pointer"><span className="text-[#aa7849]">Read More</span></Link></p>
                </div>
                {/* tags */}
                <div className="hidden xl:flex w-[600px] min-h-0 h-auto   px-[1rem] py-[1rem] bottom-[1rem] right-[25rem]  absolute">
                    <div className="w-full flex flex-row justify-between bg-[#f7cb89] rounded-full">
                        <div className="w-[50%] text-center text-[#643519] px-[1rem] py-[0.25rem] border-r-2 border-black ">
                            <h1 className="text-3xl ">100%</h1>
                            <p className="text-xl tracking-wider">Quality Products</p>
                        </div>
                        <div className="w-[50%] text-center text-[#643519] px-[1rem] py-[0.25rem]">
                            <h1 className="text-3xl ">99%</h1>
                            <p className="text-xl tracking-wider">Customer Satisfaction</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className=" hidden lg:flex flex-col mb-[3rem] 2xl:mb-[15rem] justify-center items-center gap-[2rem]  lg:text-5xl xl:text-5xl  lg:mt-[0.5rem] font-semibold text-[#f1c36c] w-full h-full ">
                <h1>Top-Rated Products</h1>
                <div className="w-full h-[500px] xl:px-[8rem] 2xl:px-[10rem] ">
                    <video src="/slide.mp4" autoPlay loop muted playsInline className="w-full h-[490px] 2xl:h-[640px] object-contain xl:object-fill"></video>
                </div>
            </div>
        </div>
    );
}
