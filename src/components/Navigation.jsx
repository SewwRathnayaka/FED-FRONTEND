import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation(props) {
  const cart = useSelector((state) => state.cart.value);
  const location = useLocation();
  const { pageName } = props;

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

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between py-8 px-12 bg-transparent text-white drop-shadow-lg">
      <div className="flex gap-x-16 items-center">
        <div className="flex flex-col items-start">
          <Link className="font-bold text-3xl bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg" to="/">
            Mebius
          </Link>
          {pageName && (
            <span className="text-base font-medium text-white/80 mt-1 ml-1 tracking-wide drop-shadow">
              {pageName}
            </span>
          )}
        </div>
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
      <div className="flex items-center gap-4">
        <div>
          <Link to="/shop/cart" className="flex items-center gap-4 relative">
            <p className="text-lg font-semibold">{getCartQuantity()}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </div>
          </Link>
        </div>
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-yellow-300 font-semibold hover:underline">Sign In</Link>
            <Link to="/sign-up" className="text-yellow-200 font-semibold hover:underline">Sign Up</Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link to="/my-orders" className="hover:text-yellow-300">My Orders</Link>
            <Link to="/account" className="hover:text-yellow-200">Account</Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
