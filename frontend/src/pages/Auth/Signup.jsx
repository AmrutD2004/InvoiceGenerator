import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, FileText, User, PhoneCall, MapPin } from "lucide-react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    businessName: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://127.0.0.1:8000/api/user-register/", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(formData)

    })
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error( data.message);
    }
    }
    catch(error){
      toast.error("client error", error)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#fdf4ff] to-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">
            Create Your <span className="text-[#8a0194]">Account</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Join Invoicy to manage your invoices smartly.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type="email"
              value={formData.email}
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
          </div>

          {/* Business Name */}
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type="text"
              value={formData.businessName}
              name="businessName"
              placeholder="Business Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <PhoneCall className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type="text"
              value={formData.phone}
              name="phone"
              placeholder="Phone number"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-neutral-500"
            >
            </button>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type="text"
              value={formData.address}
              name="address"
              placeholder="Your Address"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0194] focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-neutral-500"
            >
            </button>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-[#8a0194]" size={18} />
            <input onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
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


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8a0194] hover:bg-[#6b0074] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#8a0194] font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
