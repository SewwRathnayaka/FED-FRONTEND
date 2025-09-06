import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navigation(props) {
  const cart = useSelector((state) => state.cart.value);
  const location = useLocation();
  const { pageName } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-4 sm:py-8 sm:px-12 bg-transparent text-white drop-shadow-lg">
      {/* Logo and page name */}
      <div className="flex flex-col items-start">
        <Link className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg" to="/">
          Mebius
        </Link>
        {pageName && (
          <span className="text-sm sm:text-base font-medium text-white/80 mt-1 ml-1 tracking-wide drop-shadow">
            {pageName}
          </span>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-x-16 items-center">
        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-semibold px-3 py-1 rounded transition-all duration-200 ${location.pathname === link.to ? 'bg-yellow-400 text-gray-900 shadow' : 'text-white hover:text-yellow-300'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Cart and Auth */}
      <div className="hidden lg:flex items-center gap-4">
        <div>
          <Link to="/shop/cart" className="flex items-center gap-2 relative">
            <p className="text-lg font-semibold">{getCartQuantity()}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
            </div>
          </Link>
        </div>
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-yellow-300 font-semibold hover:underline text-sm">Sign In</Link>
            <Link to="/sign-up" className="text-yellow-200 font-semibold hover:underline text-sm">Sign Up</Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link to="/my-orders" className="hover:text-yellow-300 text-sm">My Orders</Link>
            <Link to="/account" className="hover:text-yellow-200 text-sm">Account</Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Cart and Menu Button */}
      <div className="flex lg:hidden items-center gap-4">
        <Link to="/shop/cart" className="flex items-center gap-1 relative">
          <p className="text-sm font-semibold">{getCartQuantity()}</p>
          <ShoppingCart size={18} />
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-white hover:text-yellow-300 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md lg:hidden">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block font-semibold px-3 py-2 rounded transition-all duration-200 ${location.pathname === link.to ? 'bg-yellow-400 text-gray-900 shadow' : 'text-white hover:text-yellow-300'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Auth Links */}
            <div className="pt-4 border-t border-white/20">
              <SignedOut>
                <div className="space-y-2">
                  <Link 
                    to="/sign-in" 
                    className="block text-yellow-300 font-semibold hover:underline py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/sign-up" 
                    className="block text-yellow-200 font-semibold hover:underline py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="space-y-2">
                  <Link 
                    to="/my-orders" 
                    className="block text-white hover:text-yellow-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/account" 
                    className="block text-white hover:text-yellow-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <div className="flex items-center gap-2 py-2">
                    <span className="text-white text-sm">Profile:</span>
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
