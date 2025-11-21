import React, { useState, useEffect } from 'react'
import { Trash2, WandSparkles, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal/Modal';

const CreateInvoice = () => {
  const userID = localStorage.getItem('userID')
  const navigate = useNavigate()

  const [userBusiness, setUserBusiness] = useState({
    email: "",
    businessName: "",
    address: "",
    phone: ""
  })

  const [itemsTotal, setItemsTotal] = useState({
    subtotal: 0,
    taxTotal: 0,
    total: 0
  });

  const [invoice, setInvoice] = useState({
    user: userID,
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",

    businessName: "",
    businessEmail: "",
    businessAddress: "",
    businessPhone: "",

    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientPhone: "",

    items: [],
    notes: "",
    paymentTerms: "Net 15"
  })

  const [addItems, setAdditems] = useState([
    { name: "", quantity: "", unitPrice: "", taxPercent: "" }
  ])

  const handleAdditems = () => {
    setAdditems([
      ...addItems,
      { name: "", quantity: "", unitPrice: "", taxPercent: "" }
    ]);
  };

  const handleDeleteItems = (index) => {
    const updated = addItems.filter((_, i) => i !== index)
    setAdditems(updated)
    updateInvoiceItems(updated)
    calculateItemsTotals(updated)
  }

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-data/${id}`)
      setUserBusiness(response.data)

      setInvoice(prev => ({
        ...prev,
        businessName: response.data.businessName,
        businessEmail: response.data.email,
        businessAddress: response.data.address,
        businessPhone: response.data.phone
      }))

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInvoice(prev => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (e, index) => {
    const { name, value } = e.target
    const updated = [...addItems];
    updated[index][name] = value;
    setAdditems(updated);
    updateInvoiceItems(updated);
    calculateItemsTotals(updated);
  };

  const updateInvoiceItems = (itemsArr) => {
    setInvoice(prev => ({
      ...prev,
      items: itemsArr
    }))
  }

  const calculateItemsTotals = (itemsArr) => {
    let subtotal = 0;
    let taxTotal = 0;

    itemsArr.forEach(item => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.unitPrice) || 0;
      const tax = Number(item.taxPercent) || 0;

      const itemSubtotal = qty * price;
      subtotal += itemSubtotal;
      taxTotal += itemSubtotal * (tax / 100);
    });

    const total = subtotal + taxTotal;

    setItemsTotal({ subtotal, taxTotal, total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/create-invoice/', {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(invoice)
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Invoice created successfully')
      setInvoice('')
    } else {
      toast.error('Something went wrong')
      console.log(data)
    }
  }

  useEffect(() => {
    if (userID) {
      fetchUserData(userID)

    }
    else {
      toast.error("Please login first")
      navigate("/")
    }
  }, [])

  const [openModal, setOpenModal] = useState(false)

  const handleExtractData = (data)=>{
    setInvoice(prev=>({
      ...prev,
      clientName : data.clientName || '',
      clientEmail : data.clientEmail || '',
      clientAddress : data.clientAddress || '',
      clientPhone : data.clientPhone || '',
      name : data.itemName || '',
      quantity : data.itemQuantity || '',
      unitPrice : data.itemPerPrice || '',
      taxPercent : data.itemtaxPercent || '',

    }))
  }

  

  return (
    <div className='max-w-7xl mx-auto h-screen'>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3">
        
        <div className='p-5 flex items-center justify-between'>
          <h1 className='text-3xl font-semibold tracking-tighter text-neutral-700 text-shadow-md'>Create Invoice</h1>
          <div className="flex items-center justify-center gap-3">
            <button onClick={()=>setOpenModal(true)} type='button' className='px-4 py-3 text-white font-medium bg-[#8a0194] rounded-lg hover:bg-[#6b0074] hover:scale-102 cursor-pointer transition-all duration-200 shadow-md flex items-center gap-1'><WandSparkles />Create with AI</button>
            {openModal && (
              <Modal onExtract={handleExtractData}  close={()=>setOpenModal(false)}/>
            )}
            <button type='submit' className='px-4 py-3 text-white font-medium bg-[#8a0194] rounded-lg hover:bg-[#6b0074] hover:scale-102 cursor-pointer transition-all duration-200 shadow-md'>Save Invoice</button>
          </div>
        </div>

        <div className="mx-5 bg-white rounded-lg shadow-sm border border-neutral-300">
          <div className="grid grid-col-1 lg:grid-cols-3">
            <div className="flex flex-col leading-0 gap-3">
              <label className="text-sm text-neutral-700 tracking-tight px-4 pt-5 font-medium">Invoice Number</label>
              <input onChange={handleChange} type="text" name='invoiceNumber' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" placeholder="Invoice Number" />
            </div>
            <div className="flex flex-col leading-0 gap-3">
              <label className="text-sm text-neutral-700 tracking-tight px-4 pt-5 font-medium">Invoice Date</label>
              <input onChange={handleChange} type="date" name='invoiceDate' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" placeholder="Invoice Number" />
            </div>
            <div className="flex flex-col leading-0 gap-3">
              <label className="text-sm text-neutral-700 tracking-tight px-4 pt-5 font-medium">Due Date</label>
              <input onChange={handleChange} type="date" name='dueDate' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" placeholder="Invoice Number" />
            </div>
          </div>
        </div>

        <div className="m-5 bg-gray-100 border-neutral-300">

          <div className="grid grid-cols-1 space-y-3 lg:grid-cols-2 lg:space-x-7">
            <div className="bg-white flex flex-col border border-neutral-300 rounded-lg shadow-sm">
              <h1 className="text-lg text-neutral-700 tracking-tighter leading-tight px-3 py-5 font-semibold">Bill Form</h1>
              
              <label className="text-sm text-neutral-700 tracking-tight px-4  font-medium">Business Name</label>
              <input value={invoice.businessName} onChange={handleChange} type="text" name='businessName' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />
              
              <label className="text-sm text-neutral-700 tracking-tight px-4  font-medium">Email</label>
              <input value={invoice.businessEmail} onChange={handleChange} type="email" name='businessEmail' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />

              <label className="text-sm text-neutral-700 tracking-tight px-4  font-medium">Address</label>
              <textarea value={invoice.businessAddress} onChange={handleChange} name='businessAddress' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />

              <label className="text-sm text-neutral-700 tracking-tight px-4  font-medium">Phone</label>
              <input value={invoice.businessPhone} onChange={handleChange} type="text" name='businessPhone' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />
            </div>
            
            <div className="bg-white flex flex-col border border-neutral-300 rounded-lg shadow-sm">
              <h1 className="text-lg text-neutral-700 tracking-tighter leading-tight px-3 py-5 font-semibold">Client Form</h1>
              
              <label className="text-sm text-neutral-700 tracking-tight px-4 font-medium">Client Name</label>
              <input value={invoice.clientName} onChange={handleChange} type="text" name='clientName' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />

              <label className="text-sm text-neutral-700 tracking-tight px-4 font-medium">Client Email</label>
              <input value={invoice.clientEmail} onChange={handleChange} type="email" name='clientEmail' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />

              <label className="text-sm text-neutral-700 tracking-tight px-4 font-medium">Client Address</label>
              <textarea value={invoice.clientAddress} onChange={handleChange} name='clientAddress' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />

              <label className="text-sm text-neutral-700 tracking-tight px-4 font-medium">Client Phone</label>
              <input value={invoice.clientPhone} onChange={handleChange} type="text" name='clientPhone' className="mx-5 px-4 py-2 mb-4 border border-neutral-300 rounded-lg text-sm text-neutral-700" />
            </div>
          </div>

          <div className=" border border-neutral-300 rounded-lg w-full mt-5">
            <h1 className="p-4 text-lg tracking-tight text-neutral-700 font-semibold">Items</h1>

            <table className="w-full table-auto border-t border-separate border-spacing-y-4  bg-white">
              <thead className="bg-gray-100 border border-neutral-300 flex-1">
                <tr>
                  <th className="text-left px-4 py-3 text-xs text-neutral-600 font-medium">ITEM</th>
                  <th className="text-left px-4 py-3 text-xs text-neutral-600 font-medium">QTY</th>
                  <th className="text-left px-4 py-3 text-xs text-neutral-600 font-medium">PRICE</th>
                  <th className="text-left px-4 py-3 text-xs text-neutral-600 font-medium">TAX(%)</th>
                  <th className="text-left px-4 py-3 text-xs text-neutral-600 font-medium">TOTAL</th>
                  <th className="text-center px-4 py-3 text-xs text-neutral-600 font-medium">ACTION</th>
                </tr>
              </thead>

              <tbody className="border-separate border-spacing-x-4">
                {addItems.map((item, idx) => (
                  <tr key={idx}>
                    <td><input onChange={(e) => handleItemChange(e, idx)} value={item.name} name='name' type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700" /></td>
                    <td><input onChange={(e) => handleItemChange(e, idx)} value={item.quantity} name='quantity' type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700" /></td>
                    <td><input onChange={(e) => handleItemChange(e, idx)} value={item.unitPrice} name='unitPrice' type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700" /></td>
                    <td><input onChange={(e) => handleItemChange(e, idx)} value={item.taxPercent} name='taxPercent' type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700" /></td>

                    <td className="text-center">
                      {item.quantity && item.unitPrice
                        ? (item.quantity * item.unitPrice).toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="flex items-center justify-center text-center">
                      <Trash2 onClick={() => handleDeleteItems(idx)} className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-200" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type='button' className='mx-3 my-4 flex items-center justify-center px-3 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 gap-1' onClick={handleAdditems}><Plus className='text-neutral-700' />Add items</button>
          </div>

          {/* Totals Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 py-5 gap-6'>
            <div className='bg-white px-3 py-4 flex flex-col gap-3 rounded-lg border border-neutral-300'>
              <h1 className='text-neutral-700 font-semibold tracking-tighter text-lg text-shadow-sm'>Notes & Terms</h1>
              <label className='tracking-tight text-sm text-neutral-700 font-medium'>Notes</label>
              <textarea className='px-3 py-2 w-full border border-neutral-300 rounded-lg' name="notes" onChange={handleChange} />
              
              <label className='tracking-tight text-sm text-neutral-700 font-medium'>Payment Terms</label>
              <select className='border border-neutral-300 w-full py-2 px-2 rounded-lg' name="paymentTerms" onChange={handleChange}>
                <option>{invoice.paymentTerms}</option>
              </select>
            </div>

            <div className='bg-white px-3 py-4 flex flex-col gap-3 rounded-lg border border-neutral-300'>
              <div className='flex flex-col my-auto space-y-5'>
                <div className='flex items-center justify-between '>
                  <span className='text-sm tracking-tighter text-neutral-500 font-medium'>SubTotal:</span>
                  <span className='text-sm tracking-tighter text-neutral-500 font-medium'>${itemsTotal.subtotal.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between '>
                  <span className='text-sm tracking-tighter text-neutral-500 font-medium'>Tax:</span>
                  <span className='text-sm tracking-tighter text-neutral-500 font-medium'>${itemsTotal.taxTotal.toFixed(2)}</span>
                </div>
                <hr className='m-3  text-neutral-300' />
                <div className='flex items-center justify-between '>
                  <span className='text-lg tracking-tighter text-neutral-800 font-medium'>Total:</span>
                  <span className='text-lg tracking-tighter text-neutral-800 font-medium'>${itemsTotal.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateInvoice
