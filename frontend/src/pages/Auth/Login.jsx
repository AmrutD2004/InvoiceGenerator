import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import {Toaster, toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const [formData, setFormdata] = useState({
    email : '',
    password : ''
  })

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormdata(prev=>({...prev, [name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const response = await fetch("http://127.0.0.1:8000/api/user-login/", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    
    if (response.ok){
      toast.success(data.message);
      localStorage.setItem("userID", data.userID)
      localStorage.setItem("userName", data.userName)
      localStorage.setItem("useremail", data.eMail)
      localStorage.setItem("userBusinessname", data.businessname)
      localStorage.setItem("useraddress", data.address)
      localStorage.setItem("userphone", data.phone)

      
      setTimeout(() => {
        navigate('/')
      setIsLoading(false);
    }, 1500);
    }
    else{
      toast.error(data.message);
      setIsLoading(false);
    }
    }catch(error){
      toast.error("Somthing went wrong", error)
      setIsLoading(false);
    }
    
  };


  return (
    <div className="bg-gradient-to-b from-[#fdf4ff] to-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">
            Welcome <span className="text-[#8a0194]">Back</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Login to continue managing your invoices.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-neutral-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-[#8a0194] hover:bg-[#6b0074] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#8a0194] font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
