import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const RecentInvoicesTable = ({ invoice }) => {

    return (
        <table className="flex-1 w-full ">
            <thead className="bg-gray-100 border-b border-neutral-300 ">
                <tr>
                    <th className="text-left px-6 py-3  font-medium text-neutral-600 text-sm">CLIENT</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">AMOUNT</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">STATUS</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">DUE DATE</th>
                </tr>
            </thead>

            <tbody className='bg-white'>
                {invoice.map((inv) => (
                    <tr key={inv.id}>
                        <td  className="px-6 py-3 text-left text-neutral-700 flex flex-col font-medium"><span>{inv.clientName}</span>
                            <span className='text-sm text-neutral-500 leading-3 tracking-tight'>{inv.invoiceNumber}</span></td>
                        <td className="px-6 py-3 text-center text-neutral-700 font-medium">${inv.total}</td>
                        <td className="px-6 text-center text-neutral-700  font-medium text-sm"><span
                            className={
                                inv.status === "Paid"
                                    ? "bg-green-300 px-2 py-1 rounded-xl"
                                    : "bg-red-300 px-2 py-1 rounded-xl"
                            }
                        >
                            {inv.status}
                        </span>
                        </td>
                        <td className="px-6 py-3 text-center text-neutral-700 font-medium">{dayjs(inv.dueDate).format('MMM D, YYYY')}</td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

export default RecentInvoicesTable
