import React, { useState } from 'react';
import ContactCard from './ContactCard';
import MedbotLogo from './logo.png';

function Header() {
  const [showContact, setShowContact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
              <img src={MedbotLogo} alt="Medbot Logo" className="h-10 mr-3" />
                <span className="text-teal-600 font-bold text-xl">MEDBOT</span>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="/" className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/SaltyExorcist/Potential-Lungs-Disease-Detection-Using-Chest-X-RAY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contribute
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowContact(!showContact)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-3 px-2">
              <li>
                <a href="/" className="block px-4 py-2 bg-red-500 text-white rounded-full text-center">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                  About us
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/SaltyExorcist/Potential-Lungs-Disease-Detection-Using-Chest-X-RAY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  Contribute
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowContact(!showContact)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Contact Card Modal */}
      {showContact && <ContactCard onClose={() => setShowContact(false)} />}
    </header>
  );
}

export default Header;