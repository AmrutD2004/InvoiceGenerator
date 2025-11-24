import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoaderPinwheel } from 'lucide-react';
import dayjs from 'dayjs';
import { useReactToPrint } from "react-to-print";




const InvoiceDetail = () => {

  const [invoice, setInvoice] = useState(null);   // FIX #1
  const { invID } = useParams();

  const ref = useRef()
  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/invoice-detail/${invID}`);
      setInvoice(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching invoice:", err);
    }
  };

  const handleDownload = useReactToPrint({
    contentRef:ref,
    documentTitle: invoice?.invoiceNumber || "invoice",
        pageStyle: `
      @page {
        size: auto;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });

  useEffect(() => {
    if (invID) fetchInvoice();
  }, [invID]);


  if (!invoice) {
    return (
      <div className="max-w-7xl mx-auto h-screen flex items-center justify-center">
        <h1 className="text-neutral-500 flex items-center gap-1"><LoaderPinwheel className='text-[#8a0194] animate-spin' />Loading invoice...</h1>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto h-screen'>
      <div className='flex items-center justify-between px-5 py-5'>
        <h1 className='text-2xl text-neutral-700 font-semibold tracking-tighter'>
          Invoice: <span className='font-sans'>{invoice.invoiceNumber}</span>
        </h1>
        <button onClick={handleDownload} className='px-3 py-2 bg-[#8a0194] text-white rounded-lg cursor-pointer hover:bg-[#721378] transition-colors duration-200'>
          Print or Download
        </button>
      </div>

      <div ref={ref} className=' bg-white rounded-lg  flex flex-col space-y-3'>

        <div className='flex items-center justify-between p-7'>
          <h1 className='text-3xl font-semibold text-neutral-800 tracking-tight leading-tight flex flex-col'>
            Invoice
            <span className='text-sm text-neutral-500 font-medium'>
              {invoice.invoiceNumber}
            </span>
          </h1>

          <div>
            <h1 className='text-neutral-700 flex flex-col items-center text-lg'>
              Status
              <span className='text-sm bg-gray-200 text-black px-2 py-1 rounded-full'>
                {invoice.status}
              </span>
            </h1>
          </div>
        </div>

        <hr className='text-neutral-300 mx-10' />


        <div className='flex items-center justify-between p-7'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-neutral-600 font-medium tracking-tight text-sm'>BILL FROM</h1>
            <div className='flex flex-col items-start'>
              <h1 className='text-neutral-800 font-medium text-lg tracking-tighter'>{invoice.businessName}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.businessAddress}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.businessEmail}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.businessPhone}</h1>
            </div>
          </div>


          <div className='flex flex-col gap-2'>
            <h1 className='text-neutral-600 font-medium tracking-tight text-sm'>BILL TO</h1>
            <div className='flex flex-col items-start'>
              <h1 className='text-neutral-800 font-medium text-lg tracking-tighter'>{invoice.clientName}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.clientAddress}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.clientEmail}</h1>
              <h1 className='text-sm text-neutral-600'>{invoice.clientPhone}</h1>
            </div>
          </div>
        </div>


        <div className='flex items-center justify-between px-7'>
          <div className='flex flex-col items-start gap-1'>
            <h1 className=' text-neutral-600 tracking-tighter font-semibold'>INVOICE DATE</h1>
            <span className='text-neutral-700'>{dayjs(invoice.invoiceDate).format('MMM D, YYYY')}</span>
          </div>

          <div className='flex flex-col items-start gap-1'>
            <h1 className=' text-neutral-600 tracking-tighter font-semibold'>DUE DATE</h1>
            <span className='text-neutral-700'>{dayjs(invoice.dueDate).format('MMM D, YYYY')}</span>
          </div>

          <div className='flex flex-col items-start gap-1'>
            <h1 className=' text-neutral-600 tracking-tighter font-semibold'>PAYMENT TERMS</h1>
            <span className='text-neutral-700'>{invoice.paymentTerms}</span>
          </div>
        </div>


        <div className='mx-7 my-3 border border-neutral-300 rounded-lg'>
          <table className='flex-1 w-full p-7'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='text-left px-6 py-3 font-semibold text-neutral-600 text-sm'>ITEMS</th>
                <th className='text-center px-6 py-3 font-semibold text-neutral-600 text-sm'>QTY</th>
                <th className='text-center px-6 py-3 font-semibold text-neutral-600 text-sm'>PRICE</th>
                <th className='text-right px-6 py-3 font-semibold text-neutral-600 text-sm'>TOTAL</th>
              </tr>
            </thead>

            <tbody className='border-t border-neutral-300'>
              {invoice.items?.map(item => (
                <tr key={item.id}>
                  <td className='text-left px-6 py-3 text-neutral-700 text-sm'>{item.name}</td>
                  <td className='text-center px-6 py-3 text-neutral-700 text-sm'>{item.quantity}</td>
                  <td className='text-center px-6 py-3 text-neutral-700 text-sm'>₹{item.unitPrice}</td>
                  <td className='text-right px-6 py-3 text-neutral-700 text-sm'>
                    ₹{(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="flex flex-col items-end justify-end p-7 space-y-4">
          <div className="w-64 flex items-center justify-between">
            <h1>Subtotal</h1>
            <h1>₹{invoice.subtotal}</h1>
          </div>

          <div className="w-64 flex items-center justify-between">
            <h1>Tax</h1>
            <h1>₹{invoice.taxTotal}</h1>
          </div>

          <hr className='w-full text-neutral-300' />

          <div className="w-64 flex items-center justify-between">
            <h1>Total</h1>
            <h1>₹{invoice.total}</h1>
          </div>
        </div>


        <hr className='text-neutral-300 mx-10' />
        <div className='flex flex-col items-start px-7 py-4 gap-2'>
          <h1 className='text-neutral-700 font-medium tracking-tighter leading-tight'>NOTES</h1>
          <p className='text-sm text-neutral-500 tracking-tight'>{invoice.notes}</p>
        </div>

      </div>
    </div>
  );
};

export default InvoiceDetail;
