import { useState, useEffect } from "react";
import LoadingDots from "../components/loddindots";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");       // Store email input
    const [otp, setOtp] = useState("");           // Store OTP input
    const [loading, setLoading] = useState(false);// Loading state
    const [sentEmail, setSentEmail] = useState(false); // Tracks if OTP is sent
    const [timer, setTimer] = useState(50);       // Countdown timer
    const [validOTP, setValidOTP] = useState(false);
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [showpassword, setShowpassword] = useState(false);

    // Send OTP
    async function forgetpassword() {
        try {
            setLoading(true);
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/forget-password",
                { email }
            );
            setSentEmail(true);
            setTimer(50);
            toast.success("OTP sent successfully");
        } catch (error) {
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                toast.error("Can't send OTP");
            }
        } finally {
            setLoading(false);
        }
    }

    // Verify OTP
    async function verify() {
        try {
            setLoading(true);
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/verify-otp",
                { email, otp }
            );

            if (res.data.success) {
                toast.success("OTP verified successfully");
                setValidOTP(true);
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    }

    // Reset Password
    async function resetPassword() {
        if (newpassword !== confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password",
                { email, newpassword },
            );
            if (res.data.success) {
                toast.success("Password reset successfully");
                // redirect if needed -> window.location.href = "/login";
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Password reset failed");
        } finally {
            setLoading(false);
        }
    }

    // Countdown Timer
    useEffect(() => {
        if (sentEmail && timer > 0 && !validOTP) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && !validOTP) {
            toast.error("OTP expired. Please resend.");
            setSentEmail(false);
        }
    }, [timer, sentEmail, validOTP]);

    return (
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat grid place-content-center relative">
            <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        w-full sm:w-[85%] min-h-[250px] md:h-auto md:w-[60%] lg:w-[40rem] lg:h-[350px] xl:w-[40rem]  xl:h-[350px] xl:pl-[20px] 
        backdrop-blur-sm flex flex-col items-center gap-6 
        rounded-[10px] custom-shadow transition-all duration-500 ease-in-out`}
            >
                {/* Email Form */}
                {!sentEmail && (
                    <div className="flex flex-col items-center w-full lg:w-[80%] lg:p-4 lg:pr-[3rem]">
                        <div className="mt-[30px] lg:mb-[20px] text-center">
                            <h1 className="text-[#2c7bb0] mb-[10px] font-bold text-2xl md:text-3xl lg:text-[30px]">
                                Forgot Password
                            </h1>
                            <h2 className="text-[16px] md:text-[18px] text-[#343a46]">
                                Enter your email to reset your password
                            </h2>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                forgetpassword();
                            }}
                            className="flex flex-col gap-[10px] md:gap-[25px] pt-[20px] items-center w-full"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] lg:text-[20px] px-3 
                border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={email === ""}
                                className={`w-[90%] md:w-[350px] h-[40px] lg:h-[45px] rounded-[10px] 
    text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 
    hover:opacity-80 transition duration-300 cursor-pointer text-lg md:text-[22px] mt-[10px]
    disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading ? <LoadingDots /> : "SEND OTP"}
                            </button>

                        </form>
                    </div>
                )}

                {/* verify otp */}
                {sentEmail && !validOTP && (
                    <div className="flex flex-col items-center w-full lg:w-[80%] lg:p-4 lg:pr-[3rem]">
                        <div className="mt-[30px] lg:mb-[20px] text-center">
                            <h1 className="text-[#2c7bb0] mb-[10px] font-bold text-2xl md:text-3xl lg:text-[30px]">
                                Enter OTP
                            </h1>
                            <h2 className="text-[16px] md:text-[18px] text-[#343a46]">
                                Valid for 50 seconds ({timer}s remaining)
                            </h2>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                verify();
                            }}
                            className="flex flex-col gap-[10px] md:gap-[25px] pt-[20px] items-center w-full"
                        >

                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="6"
                                placeholder="Enter OTP"
                                className="tracking-[10px] text-center w-[90%] md:w-[350px] h-[45px] text-[18px] md:text-[20px] 
             border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-[90%] md:w-[350px] h-[40px] lg:h-[45px] rounded-[10px] 
                text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 
                hover:opacity-80 transition duration-300 cursor-pointer text-lg md:text-[22px] mt-[10px]"
                            >
                                {loading ? <LoadingDots /> : "VERIFY OTP"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 3: Reset Password */}
                {validOTP && sentEmail && (
                    <div className="flex flex-col items-center w-full pb-[20px] lg:w-[80%] lg:p-4 lg:pr-[3rem]">
                        <div className="mt-[30px] lg:mb-[20px] text-center">
                            <h1 className="text-[#2c7bb0] mb-[10px] font-bold text-2xl md:text-3xl lg:text-[30px]">
                                Enter Your New Password
                            </h1>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                resetPassword();
                            }}
                            className="flex flex-col gap-[10px] md:gap-[25px] pt-[20px] items-center w-full"
                        >
                            <input
                                type={showpassword ? "text" : "password"}
                                placeholder="New Password"
                                className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] lg:text-[20px] px-3 
                border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                                onChange={(e) => setNewpassword(e.target.value)}
                            />
                            <input
                                type={showpassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-[90%] md:w-[350px] h-[40px] text-[16px] md:text-[18px] lg:text-[20px] px-3 
                border border-[#416793] rounded-[10px] text-black bg-transparent outline-none placeholder-black"
                                onChange={(e) => setConfirmpassword(e.target.value)}
                            />
                            {newpassword !== confirmpassword && (
                                <p className="text-red-500 text-sm">
                                    Passwords do not match
                                </p>
                            )}
                            <div className="flex items-center gap-[5px] mr-[48%]">
                                <input type="checkbox" id="password" onChange={() => setShowpassword(!showpassword)} />
                                <label htmlFor="password">Show Password</label>
                            </div>
                            <button
                                type="submit"
                                disabled={newpassword !== confirmpassword}
                                className="w-[90%] md:w-[350px] h-[40px] lg:h-[45px] rounded-[10px] 
                text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 
                hover:opacity-80 transition duration-300 cursor-pointer text-lg md:text-[22px] mt-[10px] disabled:opacity-50"
                            >
                                {loading ? <LoadingDots /> : "RESET PASSWORD"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
