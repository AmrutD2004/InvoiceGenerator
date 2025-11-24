import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#faf5ff] border-t border-[#8a0194]/20 mt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/invoicy.png" alt="Logo" className="w-10" />
            <h1 className="text-2xl font-bold text-neutral-800">
              Inv<span className="text-[#8a0194]">oicy</span>
            </h1>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Simplify your invoicing process with AI. Create, manage, and send professional invoices effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li><a href="#hero" className="hover:text-[#8a0194] transition-colors">Home</a></li>
            <li><a href="#feature" className="hover:text-[#8a0194] transition-colors">Features</a></li>
            <li><a href="#faq" className="hover:text-[#8a0194] transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li><Link to="/blog" className="hover:text-[#8a0194] transition-colors">Blog</Link></li>
            <li><Link to="/pricing" className="hover:text-[#8a0194] transition-colors">Pricing</Link></li>
            <li><Link to="/terms" className="hover:text-[#8a0194] transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-[#8a0194] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-[#8a0194] hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></Link>
            <Link to="#" className="text-[#8a0194] hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></Link>
            <Link to="#" className="text-[#8a0194] hover:scale-110 transition-transform"><Twitter className="w-5 h-5" /></Link>
            <Link to="#" className="text-[#8a0194] hover:scale-110 transition-transform"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#8a0194]/10"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} <span className="font-semibold text-[#8a0194]">Invoicy</span>. All rights reserved.
        </p>
        <p className="text-sm text-neutral-500 mt-2 sm:mt-0">
          Built with ❤️ by <span className="text-[#8a0194] font-medium">AI Invoicing Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
