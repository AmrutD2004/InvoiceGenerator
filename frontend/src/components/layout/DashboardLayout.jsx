import React, { useState, useEffect } from 'react';
import { Home, LayoutDashboard, FileText, PlusCircle, User, LogOut, Menu, ChevronFirst, ChevronLast } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AiChatbot from '../AI Chatbot/AiChatbot';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
  const useremail = localStorage.getItem('useremail');
  const [active, setActive] = useState(false);
  const [siderCollaps, setSidebarcollaps] = useState(false);


  const sideBarLinks = [
    { link: 'Home', icon: <Home />, path: '/' },
    { link: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
    { link: 'Invoices', icon: <FileText />, path: '/invoices' },
    { link: 'Create Invoice', icon: <PlusCircle />, path: '/invoices/new' },
    { link: 'Profile', icon: <User />, path: '/profile' },
  ];

  const handlleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('useremail');
    toast.success('Logout Successful');
    setTimeout(() => navigate('/login'), 800);
  };

  useEffect(() => {
    if (!username) {
      navigate('/');
      toast('Please login first', {
        style: {
          background: '#f4f4f5',
          border: 'solid',
          borderColor: '#a6a09b',
        },
      });
    }
  }, [username, navigate]);

  return (
    <div className="flex h-screen w-full overflow-hidden">


      <aside className="flex h-full">
        <nav className="flex flex-col h-full bg-white shadow-sm overflow-y-auto">


          <div className="p-4 pb-2 flex items-center border-b border-[#721378] bg-white">
            <div className={`flex items-center overflow-hidden transition-all ${siderCollaps && 'w-0'}`}>
              <img className="w-8 h-8" src="https://res.cloudinary.com/dq7ldqmy4/image/upload/v1763734926/invoicy_rbzr0y.png" alt="" />
              <span className="text-lg font-bold text-neutral-800">Inv</span>
              <span className="text-[#8a0194] text-lg font-semibold">oicy</span>
            </div>
            <button
              onClick={() => setSidebarcollaps(prev => !prev)}
              className="p-1.5 rounded-lg bg-[#fae8ff] hover:bg-gray-100 ms-auto"
            >
              {siderCollaps ? <ChevronLast /> : <ChevronFirst />}
            </button>
          </div>


          <div className="flex flex-col flex-1">


            <ul className="flex-1">
              {sideBarLinks.map((links, idx) => (
                <li
                  onClick={() => setActive(links.link)}
                  key={idx}
                  className={`flex px-4 py-2 my-1 text-sm rounded-md items-center gap-3 cursor-pointer transition-colors
                  ${active === links.link ? 'bg-[#fae8ff]' : 'hover:bg-[#fdf4ff]'}`}
                >
                  <Link to={links.path} className="flex items-center gap-3">
                    {links.icon}
                    {!siderCollaps && <span>{links.link}</span>}
                  </Link>
                </li>
              ))}
            </ul>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handlleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut />
              {!siderCollaps && <span>Logout</span>}
            </button>
          </div>

          {/* USER INFO (Fixes bottom gap) */}
          <div className="border-t border-[#721378] p-3 bg-[#fdf4ff]">
            {!siderCollaps && (
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-neutral-600">{username}</span>
                <span className="font-semibold text-[#8a0194]">{useremail}</span>
              </div>
            )}
          </div>
        </nav>

        <Toaster />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {children}
      </main>
    <AiChatbot />
    </div>
  );
};

export default DashboardLayout;
