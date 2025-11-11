import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const ProfileDropdown = ({
isOpen,
onToggle,
avatar,
companyName,
email,
onLogout,
}) => {
    const navigate = useNavigate();
    return (
        <div className='relative'>
            <button
            onClick={onToggle} className='flex items-center justify-center gap-2'>
                {avatar ? (
                    <img className='h-9 w-9 object-cover rounded-xl' src={avatar} />
                ):(
                    <div className='h-8 w-9 bg-[#8a0194] flex items-center justify-center rounded-xl '>
                        <span className='text-white font-bold'>{companyName.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                <div className='hidden sm:block text-left'>
                    <p className='text-sm font-medium text-neutral-700'>{companyName}</p>
                    <p className='text-sm text-neutral-500'>{email}</p>
                </div>
                <ChevronDown className='h-4 w-4 text-neutral-700' />
            </button>
            {isOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-4 flex flex-col gap-3 z-50'>
                    <div className='px-4 py-2 text-neutral-700 border-b border-gray-200'>
                        <p className='text-sm font-medium text-neutral-700'>{companyName}</p>
                        <p className='text-xs text-neutral-700'>{email}</p>
                    </div>
                    <a className='block px-4 py-2 rounded-sm text-sm font-medium text-neutral-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer' onClick={()=>navigate('/profile')}>View Profile</a>
                    <div className='border-t border-gray-200 pt-2 '>
                        <a className='block px-4 py-2 rounded-sm text-sm font-medium text-neutral-700 hover:bg-red-50 transition-colors duration-200 cursor-pointer' onClick={onLogout}>Sign out</a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
