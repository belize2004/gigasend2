"use client"
import { useAuth } from '@/context/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import {
  FiHome,
  FiCreditCard,
  FiLogOut
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
      href: '/dashboard/billing',
      icon: FiCreditCard,
      label: 'Billing',
      active: pathname === '/dashboard/billing'
    }
  ];

  const { handleLogout } = useAuth();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
      {/* Header */}
      <div className="flex items-center mb-8">
        <BsArrowUpSquareFill className="text-3xl text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">GigaSend</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, key) => {
          const IconComponent = item.icon;
          return (
            <button
              key={key}
              className={`rounded-xl transition-all duration-200 w-full ${item.active
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}>
              <Link
                key={item.href}
                href={item.href}
                className='flex items-center px-4 py-3'
              >
                <IconComponent className="mr-3 text-lg" />
                <span className={`font-medium`}>{item.label}</span>
              </Link>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
        >
          <FiLogOut className="mr-3 text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;