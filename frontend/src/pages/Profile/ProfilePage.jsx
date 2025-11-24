import React, { useEffect, useState } from 'react'
import { Mail, User, BriefcaseBusiness, MapPin, Phone } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoaderPinwheel } from 'lucide-react';

const ProfilePage = () => {
  const userID = localStorage.getItem('userID')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    businessName: "",
    address: "",
    phone: ""
  })

  const [loading, setLoading] = useState(false)

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-data/${id}`)
      setFormData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userID) {
      fetchUserData(userID)
    } else {
      toast.error("Please login first")
      navigate("/")
    }
  }, [userID])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/update-profile/${userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("Frontend Error")
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderPinwheel className="animate-spin text-[#8a0194]" size={60} />
        </div>
      ) : (
        <div className='max-w-4xl mx-auto bg-gray-50 flex flex-col rounded-lg'>
          <div className='shadow-xl border border-neutral-300 rounded-lg mt-5'>
            <div className='relative w-full flex items-center bg-gray-100 rounded-lg'>
              <h1 className='text-xl p-5 font-semibold text-neutral-700'>My Profile</h1>
            </div>

            <form onSubmit={handleUpdate} className='flex flex-col border-t border-neutral-400 bg-white'>

              {/* EMAIL */}
              <div className='p-5 flex flex-col gap-1'>
                <label className='text-sm text-neutral-600 font-medium'>Email Address</label>
                <div className='relative flex items-center'>
                  <Mail className='absolute left-3 text-neutral-500' />
                  <input disabled value={formData.email} className='w-full text-neutral-500 px-3 py-2 pl-10 border border-neutral-300 text-sm rounded-lg bg-gray-100 cursor-not-allowed' />
                </div>
              </div>

              {/* USERNAME */}
              <div className='p-5 flex flex-col gap-1'>
                <label className='text-sm text-neutral-600 font-medium'>Full Name</label>
                <div className='relative flex items-center'>
                  <User className='absolute left-3 text-neutral-500' />
                  <input name="username" value={formData.username} onChange={handleChange} className='w-full px-3 py-2 pl-10 border border-neutral-300 text-sm rounded-lg' />
                </div>
              </div>

              <hr className='m-4 text-neutral-300' />

              <div className='flex flex-col gap-1 px-5 py-2 leading-0'> <h1 className=' text-xl tracking-tight font-semibold text-shadow-sm text-neutral-600'>Business Information</h1> <p className='tracking-tight text-neutral-400 text-sm'>This will br used to pre-fill the "Bill Form" section of your invoices.</p> </div>

              {/* BUSINESS INFO */}
              <div className='px-5'>
                <label className='text-sm text-neutral-600 font-medium'>Business Name</label>
                <div className='relative flex items-center'>
                  <BriefcaseBusiness className='absolute left-3 text-neutral-500' />
                  <input name="businessName" value={formData.businessName} onChange={handleChange} className='w-full px-3 py-2 pl-10 border border-neutral-300 text-sm rounded-lg' />
                </div>
              </div>

              <div className='px-5 pt-4'>
                <label className='text-sm text-neutral-600 font-medium'>Address</label>
                <div className='relative flex items-start'>
                  <MapPin className='absolute left-3 top-3 text-neutral-500' />
                  <textarea name="address" value={formData.address} onChange={handleChange} className='w-full p-3 pl-10 border border-neutral-300 text-sm rounded-lg resize-none' />
                </div>
              </div>

              <div className='px-5 pt-4'>
                <label className='text-sm text-neutral-600 font-medium'>Phone</label>
                <div className='relative flex items-center'>
                  <Phone className='absolute left-3 text-neutral-500' />
                  <input name="phone" value={formData.phone} onChange={handleChange} className='w-full px-3 py-2 pl-10 border border-neutral-300 text-sm rounded-lg' />
                </div>
              </div>
              <hr className='text-neutral-300 mt-4' />
              <div className='p-4 bg-gray-100 flex items-center justify-end'>
                <button type='submit' className='px-4 py-3 bg-[#8a0194] text-white rounded-lg hover:scale-102 hover:bg-[#6b0074] transition-all duration-200 cursor-pointer'>Save Changes</button>
              </div>

            </form>
          </div>
          <Toaster />
        </div>
      )}

    </>
  )
}


export default ProfilePage
