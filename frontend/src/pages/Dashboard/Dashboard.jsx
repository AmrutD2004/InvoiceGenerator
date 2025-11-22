import React, { useEffect, useState } from 'react'
import { FileChartColumnIncreasing, DollarSign, Lightbulb } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegFileAlt } from "react-icons/fa";
import AiInsights from '../../components/AI Magics/AiInsights';
import RecentInvoicesTable from '../../components/Tables/RecentInvoicesTable';
import axios from 'axios';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const Dashboard = () => {
  const userID = localStorage.getItem('userID')

  const [invoice, setInvoice] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchInvoices = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/all-invoices/${id}`);
      const data = response.data;

      // artificial delay for nice skeleton UX
      setTimeout(() => {
        setInvoice(data);
        setLoading(false);
      }, 500);
    } catch (err) {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (userID) {
      fetchInvoices(userID)
    } else {
      setTimeout(() => {
        toast.error("Please login first")
        navigate('/')
      }, 2000)


    }
  }, [])

  const totalPaid = invoice.filter(inv => inv.status.toLowerCase() === 'paid').reduce((sum, inv) => sum + Number(inv.total), 0)
  const totalUnpaid = invoice.filter(inv => inv.status.toLowerCase() === 'unpaid').reduce((sum, inv) => Number(sum + inv.total), 0);


  const navigate = useNavigate()
  return (
    <div className='max-w-7xl mx-auto flex flex-col space-y-9 h-screen'>
      <div className='flex items-center '>
        <div className='px-5 py-5 '>
          <h1 className='font-bold text-3xl tracking-tighter leading-tight text-shadow-sm text-neutral-700'>Dashboard</h1>
          <p className='tracking-tight mt-1.5 text-neutral-600 text-shadow-xs '>A quick overview of your buisness finances.</p>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full '>

        {/* TOTAL INVOICES */}
        <div className='flex items-center px-4 py-5 rounded-xl gap-4 bg-white shadow-md'>
          <div className="p-1.5 bg-blue-200 rounded-lg inline-flex">
            <FileChartColumnIncreasing className="text-blue-800" size={28} />
          </div>

          {loading ? (
            <div className='w-full'>
              <Skeleton width={120} height={18} />
              <Skeleton width={80} height={28} style={{ marginTop: "6px" }} />
            </div>
          ) : (
            <div>
              <h1 className='text-md tracking-tighter leading-6 text-neutral-600 font-semibold'>
                Total Invoices
              </h1>
              <span className='text-2xl font-bold text-neutral-700'>
                {invoice.length}
              </span>
            </div>
          )}
        </div>

        {/* TOTAL PAID */}
        <div className='flex items-center px-4 py-5 rounded-xl gap-4 bg-white shadow-md'>
          <div className="p-1.5 bg-green-200 rounded-lg inline-flex">
            <DollarSign className="text-green-800" size={28} />
          </div>

          {loading ? (
            <div className='w-full'>
              <Skeleton width={120} height={18} />
              <Skeleton width={80} height={28} style={{ marginTop: "6px" }} />
            </div>
          ) : (
            <div>
              <h1 className='text-md tracking-tighter leading-6 text-neutral-600 font-semibold'>
                Total Paid
              </h1>
              <span className='text-2xl font-bold text-neutral-700'>
                ₹ {totalPaid}
              </span>
            </div>
          )}
        </div>

        {/* TOTAL UNPAID */}
        <div className='flex items-center px-4 py-5 rounded-xl gap-4 bg-white shadow-md'>
          <div className="p-1.5 bg-red-200 rounded-lg inline-flex">
            <DollarSign className="text-red-800" size={28} />
          </div>

          {loading ? (
            <div className='w-full'>
              <Skeleton width={120} height={18} />
              <Skeleton width={80} height={28} style={{ marginTop: "6px" }} />
            </div>
          ) : (
            <div>
              <h1 className='text-md tracking-tighter leading-6 text-neutral-600 font-semibold'>
                Total Unpaid
              </h1>
              <span className='text-2xl font-bold text-neutral-700'>
                ₹ {totalUnpaid}
              </span>
            </div>
          )}
        </div>

      </div>


      <AiInsights />


      <div className='w-full flex flex-col items-center'>
        <div className='shadow-md rounded-xl w-full'>
          <div className='flex items-center justify-between w-full border-b bg-gray-100'>
            <span className='text-xl font-semibold tracking-tighter leading-tight text-neutral-700 p-6'>Recent Invoices</span>
            <Link to="/invoices" className='text-neutral-700 font-medium p-6 cursor-pointer hover:underline transition-all duration-200'>View All</Link>
          </div>
          <RecentInvoicesTable invoice={invoice} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
