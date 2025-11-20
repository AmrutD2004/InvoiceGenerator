import React, { useEffect, useState } from 'react'
import { Plus, Search, SquarePen, Trash2, Mail } from 'lucide-react'
import axios from 'axios'
import dayjs from 'dayjs'

const Allinvoices = () => {

  const userID = localStorage.getItem('userID')

  const [allInvoices, setAllInvoices] = useState([])




  const fetchInvoices = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/all-invoices/${id}`)
    const data = response.data
    setAllInvoices(data)
  }

  useEffect(() => {
    if (userID) {
      fetchInvoices(userID)
    }

  }, [userID])

  const handleStatusChange = async (invIndex) => {
    const invoice = allInvoices.find(item => item.id == invIndex)
    const newStatus = invoice.status === "Paid" ? "Unpaid" : "Paid"

    await axios.put(`http://127.0.0.1:8000/api/invoice-status/${invIndex}`, { status: newStatus })

    setAllInvoices(prev =>
      prev.map(item =>
        item.id === invIndex ? { ...item, status: newStatus } : item
      )
    );

  }

  return (
    <div className='max-w-7xl bg-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='px-5 py-5 flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold tracking-tighter text-shadow-sm text-neutral-800'>All Invoices</h1>
          <p className='text-sm tracking-tight text-neutral-500'>Manage all your invoices in one place</p>
        </div>
        <div>
          <button className='px-4 py-2 bg-[#8a0194] text-white rounded-lg shadow-sm cursor-pointer hover:scale-102 hover:bg-[#721378] transition-all duration-200 flex items-center gap-2'><Plus className='text-sm' />Create Invoice</button>
        </div>
      </div>
      <div className='p-5 m-5 w-full border border-neutral-200 rounded-lg shadow-md'>
        <div className='flex items-center justify-between bg-white rounded-lg'>
          <input className='px-4 py-1.5 border border-neutral-300 m-4 rounded-lg w-full bg-white placeholder:text-sm text-neutral-500' type="text" name="search" placeholder='🔍 Search by invoice # or client...' />
          <select className='px-4 py-2 rounded-lg m-4 border border-neutral-300' name="" id="">
            <option className='text-neutral-600' value="">All Statues</option>
            <option className='text-neutral-600' value="">Unpaid</option>
            <option className='text-neutral-600' value="">Paid</option>
          </select>
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
            {allInvoices.map((invoices, idx) => {
              return (
                <tr className='border-b border-neutral-300' key={idx}>
                  <td className="px-6 text-left text-neutral-700 font-medium text-sm">{invoices.invoiceNumber}</td>
                  <td className="px-6 text-left text-neutral-700 ium text-sm">{invoices.clientName}</td>
                  <td className="px-6 text-left text-neutral-700  font-medium text-sm">{invoices.total}</td>
                  <td className="px-6 text-left text-neutral-700  font-medium text-sm">{dayjs(invoices.dueDate).format('MMM D, YYYY')}</td>
                  <td className="px-6 text-left text-neutral-700  font-medium text-sm"><span
                    className={
                      invoices.status === "Paid"
                        ? "bg-green-300 px-2 py-1 rounded-xl"
                        : "bg-red-300 px-2 py-1 rounded-xl"
                    }
                  >
                    {invoices.status}
                  </span>
                  </td>
                  <td>
                    <button onClick={() => handleStatusChange(invoices.id)} className='border border-neutral-300 px-3 py-2 rounded-lg m-1 cursor-pointer' >Mark paid or Mark Unpai</button>
                  </td>
                  <td className='px-5'>
                    <div className='flex items-center justify-between'>
                      <SquarePen className='text-neutral-700 cursor-pointer' size={18} />
                      <Trash2 className='text-red-500 cursor-pointer' size={18} />
                      <Mail className='text-blue-500 cursor-pointer' size={18} />
                    </div>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Allinvoices
