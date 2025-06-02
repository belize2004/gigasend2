"use client"
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { FiMenu, FiX, FiHome, FiCreditCard, FiGrid, FiSend, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, handleLogout } = useAuth();
  console.log('isAuthenticated', isAuthenticated)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <BsArrowUpSquareFill className="text-3xl text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Giga Send</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                router.push('/');
              }}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FiHome className="mr-1" />
              Home
            </button>
            <button
              onClick={() => {
                router.push('/plans');
              }}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              <FiCreditCard className="mr-1" />
              Plans
            </button>

            {/* Conditional navigation items for logged in users */}
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    router.push('/dashboard');
                  }}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                  <FiGrid className="mr-1" />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    router.push('/transfer');
                  }}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                  <FiSend className="mr-1" />
                  Transfer
                </button>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <FiLogOut className="mr-1" />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push('/signin');
                  }}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                  <FiLogIn className="mr-1" />
                  Sign In
                </button>
                <button
                  onClick={() => {
                    router.push('/signup');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center">
                  <FiUserPlus className="mr-1" />
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            <button
              onClick={() => {
                router.push('/');
              }}
              className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 font-medium">
              <FiHome className="mr-2" />
              Home
            </button>
            <button
              onClick={() => {
                router.push('/plans');
              }}
              className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 font-medium">
              <FiCreditCard className="mr-2" />
              Plans
            </button>

            {/* Conditional mobile navigation items */}
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    router.push('/dashboard');
                  }}
                  className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 font-medium">
                  <FiGrid className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    router.push('/transfer');
                  }}
                  className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 font-medium">
                  <FiSend className="mr-2" />
                  Transfer
                </button>
              </>
            )}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push('/signin');
                    }}
                    className="flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 rounded-xl transition-all duration-200 font-medium">
                    <FiLogIn className="mr-2" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      router.push('/signup');
                    }}
                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    <FiUserPlus className="mr-2" />
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;