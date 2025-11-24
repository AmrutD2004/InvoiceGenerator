import React, { useEffect, useState } from 'react'
import { Plus, Search, SquarePen, Trash2, Printer } from 'lucide-react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { LoaderPinwheel } from 'lucide-react';
import toast from 'react-hot-toast'

const Allinvoices = () => {

  const userID = localStorage.getItem('userID')

  const [allInvoices, setAllInvoices] = useState([])
  const [invoices, setInvoices] = useState([])


  const [loading, setLoading] = useState(false)




  const fetchInvoices = async (id) => {
    setLoading(true)
    const response = await axios.get(`http://127.0.0.1:8000/api/all-invoices/${id}`)
    const data = response.data
    setAllInvoices(data)
    setInvoices(data)
    setLoading(false)
  }

  useEffect(() => {
    if (userID) {
      setLoading(true)
      fetchInvoices(userID)
    }

  }, [userID])

  const handleDelete = async (invIndex) => {
    if (window.confirm('Are you really want to delete invoice?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/delete-invoice/${invIndex}`, {
          method: "DELETE",
        })
        if (response.ok) {
          toast.success("Invoice Deleted Successfully")
        }
        else {
          toast.error("Please try again!")
        }
      } catch (error) {
        console.log("Something went wrong", error)
      }
      fetchInvoices(userID)
    }
  }

  const handleStatusChange = async (invIndex) => {
    const invoice = allInvoices.find(item => item.id == invIndex)
    const newStatus = invoice.status === "Paid" ? "Unpaid" : "Paid"

    await axios.put(`http://127.0.0.1:8000/api/invoice-status/${invIndex}`, { status: newStatus })

    setAllInvoices(prev =>
      prev.map(item =>
        item.id === invIndex ? { ...item, status: newStatus } : item
      )
    );

    setInvoices(prev =>
      prev.map(item =>
        item.id === invIndex ? { ...item, status: newStatus } : item
      )
    );
  }

  const handleSearch = (s) => {
    const keyword = s.toLowerCase()
    if (!keyword) {
      setInvoices(allInvoices)
    } else {
      const filterd = allInvoices.filter((filterData) => filterData.clientName?.toLowerCase().includes(keyword))
      setInvoices(filterd)
    }
  }

  return (
    <div className='max-w-7xl bg-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='px-5 py-5 flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold tracking-tighter text-shadow-sm text-neutral-800'>All Invoices</h1>
          <p className='text-sm tracking-tight text-neutral-500'>Manage all your invoices in one place</p>
        </div>
        <div>
          <Link to="/invoices/new" className='px-4 py-2 border border-neutral-300 bg-[#8a0194] text-white rounded-lg shadow-sm cursor-pointer hover:scale-102 hover:bg-[#721378] transition-all duration-200 flex items-center gap-2'><Plus className='text-sm' />Create Invoice</Link>
        </div>
      </div>
      <div className='p-5 m-5 w-full border border-neutral-200 rounded-lg shadow-md'>
        <div className='flex items-center justify-between bg-white rounded-lg'>
          <input onChange={(e) => handleSearch(e.target.value)} className='px-4 py-1.5 border border-neutral-300 m-4 rounded-lg w-full bg-white placeholder:text-sm text-neutral-500' type="text" name="search" placeholder='🔍 Search by invoice # or client...' />
          <span className='flex items-center gap-1 me-4 text-neutral-600 font-semibold text-shadow-sm tracking-tight'>Total <span>Invoices:</span> <span>{allInvoices.length}</span></span>
        </div>
        <table className='flex-1 w-full'>
          <thead className='border-b border-neutral-300'>
            <tr>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">INVOICE</th>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">CLIENT</th>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">AMOUNT</th>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">DUE DATE</th>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">STATUS</th>
              <th></th>
              <th className="text-left px-6 py-3  font-semibold text-neutral-600 text-sm">ACTION</th>
            </tr>
          </thead>



          <tbody className='border-b border-neutral-300'>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-10 text-center">

                  <LoaderPinwheel className='animate-spin mx-auto text-[#8a0194]' size={32} />

                </td>
              </tr>
            ) : (
              invoices.map((inv, idx) => (
                <tr className='border-b border-neutral-300 hover:bg-gray-200 cursor-pointer transition-colors duration-200' key={idx}>
                  <Link to={`/invoices/${inv.id}`} className='contents'>
                    <td className="px-6 text-left text-neutral-700 font-medium text-sm">{inv.invoiceNumber}</td>
                    <td className="px-6 text-left text-neutral-700 ium text-sm">{inv.clientName}</td>
                    <td className="px-6 text-left text-neutral-700  font-medium text-sm">{inv.total}</td>
                    <td className="px-6 text-left text-neutral-700  font-medium text-sm">{dayjs(inv.dueDate).format('MMM D, YYYY')}</td>
                    <td className="px-6 text-left text-neutral-700  font-medium text-sm"><span
                      className={
                        inv.status === "Paid"
                          ? "bg-green-300 px-2 py-1 rounded-xl"
                          : "bg-red-300 px-2 py-1 rounded-xl"
                      }
                    >
                      {inv.status}
                    </span>
                    </td>
                    <td>
                      <button onClick={() => handleStatusChange(inv.id)} className='border border-neutral-300 px-3 py-2 rounded-lg m-1 cursor-pointer' >{inv.status.toLowerCase() === 'paid' ? (
                        'Mark Unpaid'
                      ) : ('Mark Paid')}</button>
                    </td>
                    <td className='px-5'>
                      <div className='flex items-center justify-between'>
                        <Trash2 onClick={() => handleDelete(inv.id)} className='text-red-500 cursor-pointer' size={18} />
                        <Link to={`/invoices/${inv.id}`}><Printer className='text-blue-500 cursor-pointer' size={18} /></Link>
                      </div>
                    </td>
                  </Link>
                </tr>
              )
              )

            )}

          </tbody>


        </table>
      </div>
    </div>
  )
}

export default Allinvoices
