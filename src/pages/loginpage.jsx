import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";//send http req for backend
import toast from "react-hot-toast";
import { FaFacebookF, } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoadingDots from "../components/loddindots";
import { useGoogleLogin } from '@react-oauth/google';

export default function Loginpage() {

    /* Login page */
    const [showLogin, setShowLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Load page smoothly
    const location = useLocation();
    const [isLoding, setIsLoding] = useState(false)


    /* google login */
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setIsLoding(true)
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
                token: tokenResponse.access_token
            }).then((res) => {
                console.log(res.data)
                console.log("tokenResponse:", tokenResponse);
                if (res.data.message === "Not Saved") {
                    toast.error("Failed To Create An Account")
                    setIsLoding(false)
                    return
                }
                toast.success("login success")
                navigate("/")
                setIsLoding(false)
            }).catch((error) => {
                console.log(error)
                toast.error("Can't To Create An Account and Try Again ")
                setIsLoding(false)
            })
        },
        onError: error => console.log('Login Failed:', error),
    });

    // Show register form if navigated from header
    useEffect(() => {
        if (location.state?.showRegister) {
            setShowLogin(false); // This shows the Register form
        }

    }, [location.state]);



    /* Register page */

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [femail, setFemail] = useState("")
    const [fpassword, setFPassword] = useState("")
    const [number, setNumber] = useState("")


    function Register() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
            firstName: fname,
            lastName: lname,
            email: femail,
            password: fpassword,
            phone: number
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.message === "Not Saved") {
                    toast.error("Failed To Create An Account")
                    setIsLoding(false)
                    return
                }
                toast.success("Successfully Created An Account")
                navigate("/")
                setIsLoding(false)

            }).catch((error) => {
                console.log(error)
                toast.error("Can't To Create An Account and Try Again ")
                setIsLoding(false)

            })
    }
    // Login page
    function login() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
            email: email,
            password: password
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            setIsLoding(false)

            toast.success("Login Success");
            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }).catch((error) => {
            console.log(error);
            toast.error("Incorrect Email or Password");
            setIsLoding(false)
        })
    }

    return (
        /* Login + Register Wrapper */
        <div className="w-full   h-screen bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat grid place-content-center relative">

            {/* Login Page */}
            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
    w-full sm:w-[85%] min-h-[400px] md:h-auto md:w-[70%] lg:w-[60rem] lg:h-[660px] xl:w-[70rem] xl:h-[620px]  
    backdrop-blur-sm flex flex-col md:pl-[9%] md:py-[15px] lg:pl-0 lg:py-0 lg:flex-row gap-6 lg:gap-[110px] 
    rounded-[10px] custom-shadow transition-all duration-500 ease-in-out 
    ${showLogin ? 'block' : 'hidden'}`}
            >
                {/* Left Panel (Hidden on sm & md) */}
                <div className="hidden lg:flex lg:w-[60%] xl:w-[60%] rounded-l-[30px] text-white flex-col items-center relative">
                    <div className="absolute z-10 text-center px-[20px] pt-[8rem] flex flex-col items-center gap-[3rem]">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Welcome Back</h1>
                        <span className="text-gray-400 text-sm md:text-base lg:text-[18px]">
                            Experience luxury with our skin-friendly cosmetics, carefully crafted to enhance your natural beauty, nourish your skin, and give you the radiant confidence to shine every single day. Discover elegance in every shade and glow like never before.
                        </span>
                        <Link
                            className="w-[8rem] md:w-[9rem] lg:w-[10rem] text-lg md:text-xl lg:text-2xl text-center pb-[5px] rounded-2xl 
          bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_4px_10px_rgba(0,0,0,0.6)] 
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.7)] transition-shadow mt-[4rem] lg:mt-[11rem]"
                            to="/"
                        >
                            Get Started
                        </Link>
                    </div>
                    <img src="/cream.jpg" alt="" className="w-full h-full absolute rounded-l-[30px]" />
                </div>

                {/* Right Panel (Form) */}
                <div className="flex flex-col  pl-[22px] lg:items-center w-full lg:w-[40%] lg:p-4 lg:pr-[6rem]">
                    <div className="mt-[15px] ml-[2rem] md:ml-[3rem] lg:ml-0 mb-[10px] lg:mt-[30px] lg:mb-[20px] lg:text-center">
                        <h1 className="text-[#2c7bb0] max-[325px]:ml-[1.5rem] min-[420px]:ml-[5rem] md:ml-[1.5rem] lg:ml-0 font-bold text-2xl md:text-3xl lg:text-[35px]">Welcome Back</h1>
                        <h2 className="text-[16px] min-[420px]:ml-[3.5rem] md:text-[18px] md:ml-[0.5rem] lg:ml-0 lg:text-[20px] text-[#343a46]">Login to your beauty account</h2>
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); setIsLoding(true); login(); }}
                        className="flex flex-col gap-[10px] md:gap-[35px] pl-[5px] pt-[10px] md:pt-[20px] relative"
                    >
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] border border-[#416793] px-3 rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />

                        <div className="flex flex-row justify-between items-center mr-[10%] md:mr-[20%] lg:gap-[50px] ">
                            <div className="flex gap-[5px] lg:items-center lg:gap-2 lg:absolute lg:top-[9.5rem]">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="  lg:w-4  lg:h-4 accent-blue-600"
                                />
                                <label htmlFor="showPassword" className="text-[14px] md:text-[15px] text-[#232933] cursor-pointer">
                                    Show Password
                                </label>
                            </div>
                            <div className="lg:absolute lg:top-[9.5rem] lg:left-[66%]">
                                <Link to="/forgotpassword" className="text-[14px] md:text-[15px] text-[#232933] cursor-pointer">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-[90%] md:w-[350px] h-[35px] lg:h-[45px] rounded-[10px] text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-80 transition duration-300 cursor-pointer text-lg md:text-[22px] mt-[15px] md:mt-0 lg:mt-[15px] "
                        >
                            {isLoding ? <LoadingDots /> : "Login"}
                        </button>
                    </form>

                    <span className="min-[420px]:ml-[3.5rem] mt-[20px] ml-[0.5rem] md:ml-[1.5rem] lg:ml-0  text-sm md:text-[17px] text-[#232933] lg:text-center">
                        Don't have an account?{" "}
                        <button className="text-blue-900 cursor-pointer" onClick={() => setShowLogin(false)}>SignUp</button> from here
                    </span>

                    <span className="min-[420px]:ml-[8.4rem] mt-[5px] text-sm ml-[5rem] md:ml-[7rem] lg:ml-0 md:text-[17px] text-[#161b24] lg:text-center">OR Continue With</span>

                    <div className="max-[325px]:ml-[5.5rem] min-[420px]:ml-[8.9rem] flex lg:flex-col ml-[5.8rem] md:ml-[7.5rem] md:mb-[10px] lg:mb-0 lg:ml-0 lg:gap-[15px] md:gap-[20px] mt-[10px] md:items-center ">
                        <div className=" lg:w-[350px]  h-[40px] text-[16px] md:text-[18px] lg:border border-[#416793] px-3 lg:rounded-[10px] text-black bg-transparent outline-none flex items-center justify-center gap-[5px] cursor-pointer">
                            <FaFacebookF className="text-white bg-blue-600 py-[5px] px-[2px] rounded-[10px] lg:rounded-[5px] cursor-pointer text-2xl md:text-3xl" />
                            <span className="hidden lg:block">Sign With Facebook</span>
                        </div>
                        <div className=" lg:w-[350px]  h-[40px] text-[16px] md:text-[18px] lg:border border-[#416793] px-3 lg:rounded-[10px] text-black bg-transparent outline-none flex items-center justify-center gap-[5px]  cursor-pointer"
                            onClick={googleLogin}>
                            <FcGoogle className="bg-white py-52px] px-[2px] rounded-[10px] lg:rounded-[5px] cursor-pointer text-2xl md:text-3xl" />
                            <span className="hidden lg:block">Sign With Google</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Register Page */}
            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
    w-full sm:w-[85%] min-h-[400px] md:h-auto md:w-[70%] lg:w-[60rem] lg:h-[660px] xl:w-[70rem] xl:h-[620px]  
    backdrop-blur-sm flex flex-col md:pl-[9%] md:py-[15px] lg:pl-0 lg:py-0 lg:flex-row gap-6 lg:gap-[110px] 
    rounded-[10px] custom-shadow transition-all duration-500 ease-in-out  
    ${showLogin ? 'hidden' : 'block'}`}
            >
                {/* Left Panel (Hidden on sm & md) */}
                <div className="hidden lg:flex lg:w-[60%] xl:w-[60%] rounded-l-[30px] text-white flex-col items-center relative">
                    <div className="absolute z-10 text-center px-[20px] pt-[8rem] flex flex-col items-center gap-[3rem]">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Create an Account</h1>
                        <span className="text-gray-400 text-sm md:text-base lg:text-[18px]">
                            Experience luxury with our skin-friendly cosmetics, carefully crafted to enhance your natural beauty, nourish your skin, and give you the radiant confidence to shine every single day. Discover elegance in every shade and glow like never before.
                        </span>
                        <Link
                            className="w-[8rem] md:w-[9rem] lg:w-[10rem] text-lg md:text-xl lg:text-2xl text-center pb-[5px] rounded-2xl 
        bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_4px_10px_rgba(0,0,0,0.6)] 
        hover:shadow-[0_6px_15px_rgba(0,0,0,0.7)] transition-shadow mt-[4rem] lg:mt-[11rem]"
                            to="/"
                        >
                            Get Started
                        </Link>
                    </div>
                    <img src="/cream.jpg" alt="" className="w-full h-full absolute rounded-l-[30px]" />
                </div>

                {/* Right Panel */}
                <div className="flex flex-col max-[325px]:pl-[8px] max-[400px]:pl-[25px] lg:items-center w-full lg:w-[40%] lg:p-4 lg:pr-[6rem]">
                    <div className="mt-[15px] ml-[20px] min-[370px]:ml-[0rem] min-[420px]:ml-[2rem] md:ml-[30px] lg:ml-0 mb-[10px] lg:mt-[30px] lg:mb-[20px] lg:text-center">
                        <h1 className="text-[#2c7bb0] min-[370px]:ml-[2rem]  min-[420px]:ml-[3.5rem] md:ml-0 lg:ml-0 font-bold text-2xl md:text-3xl lg:text-[25px]">Create a new account</h1>
                        <h2 className="text-[16px] max-[325px]:ml-[23px] min-[370px]:ml-[3.5rem]  min-[420px]:ml-[5rem] md:ml-[40px] lg:ml-0 md:text-[18px] lg:text-[18px] text-[#343a46]">Create your beauty account</h2>
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); setIsLoding(true); Register(); }}
                        className="flex flex-col gap-[20px] min-[420px]:ml-[2rem] md:ml-5 lg:ml-0 md:gap-[28px] pt-[20px] relative "
                    >
                        <input
                            type="text"
                            placeholder="First name"
                            onChange={(e) => setFname(e.target.value)}
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            onChange={(e) => setLname(e.target.value)}
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={10}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Phone number"
                            onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setFemail(e.target.value)}
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            onChange={(e) => setFPassword(e.target.value)}
                            className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] px-3 border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                        />
                        <button
                            type="submit"
                            className="w-[90%] md:w-[350px] h-[40px] lg:h-[45px] rounded-[10px] text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-80 transition duration-300 cursor-pointer text-lg md:text-[22px] mt-[15px]"
                        >
                            {isLoding ? <LoadingDots /> : "Submit"}
                        </button>
                    </form>

                    <span className=" w-full max-[325px]:ml-[0.55rem] mt-[20px] min-[370px]:ml-[1.5rem] min-[420px]:ml-[4rem] md:ml-[2.5rem] lg:ml-0 mb-[10px] md:mb-0 text-sm md:text-[17px] lg:text-center text-[#e7e7e9]">
                        Already have an account?{" "}
                        <button className="text-blue-400 cursor-pointer" onClick={() => setShowLogin(true)}>SignIn</button> from here
                    </span>
                </div>
            </div>

        </div>

    );
}