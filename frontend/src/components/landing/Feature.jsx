import React from 'react';
import { Sparkles, ArrowRight, ChartNoAxesColumn, Mail, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feature = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Invoice Creation',
      description:
        'Paste any text, email, or receipt, and let our AI instantly generate a complete, professional invoice for you.',
    },
    {
      icon: ChartNoAxesColumn,
      title: 'AI-Powered Dashboard',
      description:
        'Get smart, actionable insights about your business finances, generated automatically by our AI analyst.',
    },
    {
      icon: Mail,
      title: 'Smart Reminders',
      description:
        'Automatically generate polite and efficient payment reminder emails for overdue invoices with a single click.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Easy Invoice Management',
      description:
        'Easily manage all your invoices, track payments, and send reminders for overdue payments — all in one place.',
    },
  ];

  return (
    <section  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Powerful <span className="text-[#8a0194]">AI Features</span>
        </h2>
        <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
          Everything you need to simplify your invoicing, automate workflows, and grow your business faster.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="group px-6 py-8 border border-[#8a0194]/40 rounded-xl shadow-lg hover:shadow-2xl hover:border-[#8a0194] transition-all duration-300 bg-white"
          >
            <div className="flex items-center justify-center mb-4">
              <Icon className="text-[#8a0194] bg-[#faf5ff] p-3 rounded-full w-12 h-12 shadow-sm group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 text-center">{title}</h3>
            <p className="text-neutral-600 text-sm mt-3 text-center leading-relaxed">{description}</p>

            <Link
              to="#"
              className="flex items-center justify-center gap-2 text-[#8a0194] hover:text-[#4b004f] mt-4 transition-colors duration-200 font-medium"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
