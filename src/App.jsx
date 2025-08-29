import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Loginpage from "./pages/loginpage"
import Adminpage from "./pages/Adminpage"
import Testpage from "./pages/Testpage"
import { Toaster } from "react-hot-toast"
import { Clientpage } from "./pages/client/clientpage"
import HomeBtn from "./components/homebtn"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from "./pages/forgetpaswword"

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET 
function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId} >
        <div className="w-full h-screen">
          <Toaster possition="top-right" />
          <Routes path="/">
            <Route path="/" element={<Clientpage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/forgotpassword" element={<ForgetPassword/>} />
            <Route path="/admin/*" element={<Adminpage />} />
            <Route path="/test" element={<Testpage />} />
            <Route path="/user/*" element={<Clientpage />} />
            <Route path="/*" element={<HomeBtn />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>

  )
}

export default App
