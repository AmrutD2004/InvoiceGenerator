import React from 'react';    
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {

  const username1 = localStorage.getItem('userName')
  const isAuthenticated = !!username1; 
  const navigate = useNavigate();

  return (
    <section className="relative bg-white overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ff] via-white to-white pointer-events-none"></div>

      {/* Main container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tagline Badge */}
        <div className="flex justify-center items-center mb-8">
          <span className="px-4 py-2 text-sm font-medium bg-[#f8e6fc] text-[#8a0194] rounded-full border border-[#8a0194]/60 shadow-sm">
            #1 AI Powered Invoice Generator
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 leading-tight tracking-tight">
              Smart <span className="text-[#8a0194]">AI-Powered</span> Invoice Generator
            </h1>

            <p className="text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0">
              Create, manage invoices effortlessly — powered by AI automation to help you save time and get paid faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#8a0194] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6b0074] transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-[#8a0194] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6b0074] transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                  >
                    Get Started Free
                  </button>

                  <Link
                    to="#feature"
                    className="border-2 border-[#8a0194] px-6 py-3 rounded-lg font-medium hover:bg-[#fdf4ff] transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://res.cloudinary.com/dq7ldqmy4/image/upload/v1763823146/Screenshot_2025-11-22_202051_sihk23.png"
              alt="AI-powered invoice generator dashboard illustration"
              className="w-full max-w-lg drop-shadow-2xl drop-shadow-[#f6cfff] rounded-2xl animate-fadeIn border border-[#f6cfff] hover:scale-102 transition-all duration-200 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
  