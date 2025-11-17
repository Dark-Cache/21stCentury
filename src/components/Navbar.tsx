// Navbar.tsx
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate("home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { label: "Home", page: "home" },
    { label: "About", page: "about" },
    { label: "Blog", page: "blog" },
    { label: "Testimonies", page: "testimonies" },
  ];

  if (isAdmin) {
    navItems.push({ label: "Admin", page: "admin" });
  }

  return (
    <nav className={`${isScrolled ? 'bg-indigo-900/95 shadow-lg' : 'bg-indigo-900/90'} backdrop-blur-md sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg px-3 py-2 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse">
            21
          </div>
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-xl font-bold text-white hover:text-yellow-300 transition-all duration-300 hover:scale-105"
          >
            21st Century Prophet
          </button>
        </div>



        {/* Centered Navigation (Desktop) */}
        <div className="hidden md:flex md:space-x-1">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${
                currentPage === item.page
                  ? 'text-yellow-300 bg-white/10'
                  : 'text-white hover:text-yellow-300 hover:bg-white/5'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ${
                currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="text-white/80 text-sm">
                Welcome, {user.email?.split('@')[0]}
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
              <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-indigo-800/95 backdrop-blur border-t border-indigo-700/50">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                  currentPage === item.page
                    ? 'text-yellow-300 bg-white/15 scale-105'
                    : 'text-white hover:bg-indigo-700/40 hover:text-yellow-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <>
                <div className="px-4 py-2 text-white/60 text-sm border-t border-indigo-700/50 mt-4">
                  Signed in as {user.email?.split('@')[0]}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-white font-medium hover:bg-red-600/20 hover:text-red-300 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 space-y-3 border-t border-indigo-700/50">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("login");
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-4 py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("login");
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}