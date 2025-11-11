import React from 'react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimoni = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
          What Our <span className="text-[#8a0194]">Users Say</span>
        </h2>
        <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
          Trusted by thousands of businesses and freelancers who love how easy invoicing has become with our AI-powered platform.
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group px-6 py-8 border border-[#8a0194]/40 rounded-xl shadow-lg hover:shadow-2xl hover:border-[#8a0194] transition-all duration-300 bg-white">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="text-[#8a0194] bg-[#faf5ff] p-3 rounded-full w-12 h-12 shadow-sm group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 text-center">
            “It saves me hours every week!”
          </h3>
          <p className="text-neutral-600 text-sm mt-3 text-center leading-relaxed">
            The AI invoice generator is incredible — I just paste my client email, and it builds a perfect invoice instantly.
          </p>

          <Link
            to="#"
            className="flex items-center justify-center gap-2 text-[#8a0194] hover:text-[#4b004f] mt-4 transition-colors duration-200 font-medium"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="group px-6 py-8 border border-[#8a0194]/40 rounded-xl shadow-lg hover:shadow-2xl hover:border-[#8a0194] transition-all duration-300 bg-white">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="text-[#8a0194] bg-[#faf5ff] p-3 rounded-full w-12 h-12 shadow-sm group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 text-center">
            “Mindblowing application”
          </h3>
          <p className="text-neutral-600 text-sm mt-3 text-center leading-relaxed">
            The best invoice app I have ever used, it is simple and poweful
          </p>

          <Link
            to="#"
            className="flex items-center justify-center gap-2 text-[#8a0194] hover:text-[#4b004f] mt-4 transition-colors duration-200 font-medium"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="group px-6 py-8 border border-[#8a0194]/40 rounded-xl shadow-lg hover:shadow-2xl hover:border-[#8a0194] transition-all duration-300 bg-white">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="text-[#8a0194] bg-[#faf5ff] p-3 rounded-full w-12 h-12 shadow-sm group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 text-center">
            “Extremely fast and productive”
          </h3>
          <p className="text-neutral-600 text-sm mt-3 text-center leading-relaxed">
            I love the dashboard, how it is simple to see and use for beginner friendly.
          </p>

          <Link
            to="#"
            className="flex items-center justify-center gap-2 text-[#8a0194] hover:text-[#4b004f] mt-4 transition-colors duration-200 font-medium"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
