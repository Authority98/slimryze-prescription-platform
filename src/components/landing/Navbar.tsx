import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Stethoscope, Menu, X, PenLine } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SlimRyze
              </span>
              <span className="text-xs text-gray-600 -mt-1">E-Prescription Platform</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate('/prescription')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" />
              Create Prescription
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              FAQ
            </button>
            <div className="px-4">
              <Button
                onClick={() => navigate('/prescription')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Create Prescription
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 