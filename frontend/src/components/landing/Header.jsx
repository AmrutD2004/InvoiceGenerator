import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBigRight, FastForward, Menu, X } from 'lucide-react';
import ProfileDropdown from '../layout/ProfileDropdown';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()


    const handlelogout = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('useremail')
        setTimeout(()=>{
            toast.success("Logged out successfully")
            navigate('/login')
        },2000)
    }
    const username1 = localStorage.getItem('userName')
    const useremail = localStorage.getItem('useremail')
    const isAuthenticated = !!username1; // Replace with actual authentication check
    const user = { name: username1, email: useremail }; // Replace with actual user data

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-grey-100 ${isScrolled ? 'bg-white/95 background-blur-am shadow-lg' : 'bg-white/0'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:mt-3">
                <div className='flex items-center justify-between'>
                    {/* Logo Section */}
                    <div className='flex items-center justify-center'>
                        <a href="#hero" className='flex items-center justify-center leading-tight tracking-tighter text-shadow-xs'>
                            <img src="https://res.cloudinary.com/dq7ldqmy4/image/upload/v1763734926/invoicy_rbzr0y.png" alt="logo" width="50" />
                            <span className='text-2xl font-bold text-neutral-800'>Inv</span>
                            <span className='text-[#8a0194] text-2xl font-semibold'>oicy</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center justify-center gap-8'>
                        <a href="#feature" className='text-md text-neutral-600 hover:text-[#8a0194] transition-colors duration-200 '>Feature</a>
                        <a href="#testimoni" className='text-md text-neutral-700 hover:text-[#8a0194] transition-colors duration-200'>Testimoni</a>
                        <a href="#faq" className='text-md text-neutral-700 hover:text-[#8a0194] transition-colors duration-200'>FAQ's</a>
                    </div>

                    {/* Right Section (Auth + Dropdown) */}
                    <div className='hidden lg:flex items-center justify-center gap-8'>
                        {isAuthenticated ? (
                            <ProfileDropdown
                                isOpen={dropdownOpen}
                                onToggle={(e) => {
                                    e.stopPropagation();
                                    setDropdownOpen(!dropdownOpen);
                                }}
                                avatar={user.avatar || ""}
                                companyName={user.name || ""}
                                email={user.email || ""}
                                onLogout={handlelogout}
                            />
                        ) : (
                            <>
                                <Link to="/login" className='text-md text-neutral-700 hover:text-[#8a0194] transition-all duration-200'>Login</Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-lg text-white flex items-center justify-center gap-2
            bg-[#8a0194] shadow-lg px-4.5 py-2.5 border-1 border-b-white rounded-lg hover:bg-[#6b0074] hover:scale-105 ease-out hover:shadow-xl transition-all duration-300"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button (Visible only on small screens) */}
                    <div className='lg:hidden'>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='p-2 rounded-lg text-neutral-600 hover:text-neutral-800 transition-colors duration-200 ease'
                        >
                            {isMenuOpen ? (
                                <X className='w-6 h-6 text-neutral-800 cursor-pointer' />
                            ) : (
                                <Menu className='w-6 h-6 text-neutral-800 cursor-pointer' />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className='lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg'>
                    <div className='px-2 pt-2 space-y-1 sm:px-3'>
                        <Link className='block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-gray-50 font-medium transition-colors duration-200' to="#feature">Feature
                        </Link>
                        <Link className='block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-gray-50 font-medium transition-colors duration-200' to="#testimoni">Testimoni
                        </Link>
                        <Link className='block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-gray-50 font-medium transition-colors duration-200' to="#faq">FAQ's
                        </Link>
                        <div className='border-t border-gray-200 my-2'></div>
                        {isAuthenticated ? (
                            <div className='p-4 cursor-pointer flex items-center justify-center'>
                                <Button onClick={()=>navigate("/dashboard")} className="">Go to Dashboard</Button>
                            </div>
                        ):(
                            <>
                            <Link className='block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-gray-50 font-medium transition-colors duration-200' to="/login">Login</Link>
                            <Link className='block w-full text-left bg-neutral-800 hover:bg-neutral-900 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 ' to="/signup">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
