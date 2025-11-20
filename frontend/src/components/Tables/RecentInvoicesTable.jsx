import React from 'react'

const RecentInvoicesTable = () => {
    return (
        <table className="flex-1 w-full ">
            <thead className="bg-gray-100 border-b ">
                <tr>
                    <th className="text-left px-6 py-3  font-medium text-neutral-600 text-sm">CLIENT</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">AMOUNT</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">STATUS</th>
                    <th className="text-center px-6 py-3 font-medium text-neutral-600 text-sm">DUE DATE</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="px-6 py-3 text-left text-neutral-700 flex flex-col font-medium"><span>Jhon</span>
                        <span className='text-sm text-neutral-500 leading-3 tracking-tight'>#INV-204</span></td>
                    <td className="px-6 py-3 text-center text-neutral-700 font-medium">$250</td>
                    <td className="px-6 py-3 text-center text-green-700 font-medium "><span className='bg-green-300 px-2 py-1 rounded-xl'>Paid</span></td>
                    <td className="px-6 py-3 text-center text-neutral-700 font-medium">Sep 30, 2025</td>
                </tr>
            </tbody>
        </table>
    )
}

export default RecentInvoicesTable
