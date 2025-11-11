import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(false); // track which FAQ is open

  const faqs = [
    {
      question: "How does the AI invoice creation work?",
      ans: "Simply paste the text that contains invoice details — like an email, receipt, or message — and our AI extracts all relevant information to create a professional invoice automatically."
    },
    {
      question: "Can I customize my invoice?",
      ans: "Yes! You can select from various templates, adjust fonts, and colors, and even add your company logo to match your brand style."
    },
    {
      question: "Is my data secure?",
      ans: "Absolutely. Your data is encrypted and securely stored. We prioritize privacy and never share your information with third parties."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Frequently Asked <span className="text-[#8a0194]">Questions</span>
        </h2>
        <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
          Everything you need to know about the product and billing.
        </p>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full sm:w-3/4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-50 mb-4 w-full px-6 py-4 rounded-xl text-neutral-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="text-lg sm:text-xl font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#8a0194] transform transition-all ease duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Show Answer */}
              {openIndex === idx && (
                <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
                  {faq.ans}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
