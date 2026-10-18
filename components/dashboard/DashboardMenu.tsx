"use client"
import { useAuth } from '@/context/useAuth';
import Link from '@/components/compat/Link';
import { usePathname } from '@/components/compat/navigation';
import React from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { brand } from '@/lib/brand';
import {
  FiHome,
  FiCreditCard,
  FiLogOut,
  FiSend
} from 'react-icons/fi';

const DashboardMenu: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/dashboard',
      icon: FiHome,
      label: 'Home',
      active: pathname === '/dashboard'
    },
    {
      href: '/transfer',
      icon: FiSend,
      label: 'Send Files',
      active: pathname === '/transfer'
    },
    {
      href: '/dashboard/billing',
      icon: FiCreditCard,
      label: 'Billing',
      active: pathname === '/dashboard/billing'
    }
  ];

  const { handleLogout } = useAuth();

  return (
    <div className="apple-glass bg-ocean-900/90 border border-white/10 shadow-2xl rounded-3xl p-6 h-fit">
      {/* Header */}
      <div className="flex items-center mb-8 pb-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-3 border border-gold-500/20">
          <BsArrowUpSquareFill className="text-xl text-gold-400" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white font-display tracking-tight">{brand.productName}</h1>
          <span className="label-caps text-gold-400 text-[9px] block">Workspace Console</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, key) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href || key}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 w-full tap-tactile ${item.active
                ? 'btn-gold text-ocean-950 font-bold shadow-lg shadow-gold-500/20'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
            >
              <IconComponent className="mr-3 text-lg" />
              <span className="font-semibold font-display">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all duration-200 text-sm tap-tactile"
        >
          <FiLogOut className="mr-3 text-lg" />
          <span className="font-semibold font-display">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;
