'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  Compass, 
  BookOpen, 
  LogOut, 
  User, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  CheckCircle,
  BarChart2,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onViewChange: (view: string) => void;
  currentView: string;
  user: any;
  onLogout: () => void;
}

export const Navbar = ({ onViewChange, currentView, user, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ view, label, icon: Icon }: any) => (
    <button
      onClick={() => { onViewChange(view); setIsOpen(false); }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
        currentView === view 
          ? 'text-blue-600 bg-blue-50 font-medium' 
          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onViewChange('dashboard')}>
            <Compass className="h-8 w-8 text-blue-600" />
            <div className="ml-3 flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight">BWI Explorer</span>
              <span className="text-xs text-slate-500 font-medium">Tourism Recommender</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink view="dashboard" label="Home" />
            <NavLink view="destinasi" label="Destinations" />
            {user ? (
              <>
              <NavLink view="preferences" label="My Preferences" />
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center space-x-3 ml-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                    {user.name[0]}
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-sm text-slate-500 hover:text-red-500"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => onViewChange('auth')}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-slate-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <NavLink view="dashboard" label="Home" />
            <NavLink view="destinasi" label="Destinations" />
            <NavLink view="about" label="About CBF" />
            {user ? (
              <>
                <NavLink view="preferences" label="My Preferences" />
                <button 
                  onClick={onLogout}
                  className="w-full text-left flex items-center space-x-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <NavLink view="auth" label="Sign In / Register" />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-white border-t border-slate-200 mt-auto">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-slate-400 text-sm">
        &copy; Banyuwangi Tourism Recomender.
      </div>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="https://github.com/AstorBoy11/CBF-Tourism-Recommender.git" className="text-slate-400 hover:text-slate-500">GitHub</a>
        <a href="about" className="text-slate-400 hover:text-slate-500">About CBF</a>

      </div>
    </div>
  </footer>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export { SparklesIcon };
