import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { Navigate } from "react-router";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      <main className="relative z-10 px-4 sm:px-8 pt-24 sm:pt-32 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 bg-white/70 rounded-xl px-4 sm:px-6 py-2 shadow-lg mb-6 sm:mb-8 backdrop-blur-md">Checkout Page</h2>
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 sm:gap-8 items-start justify-center">
          {/* Order Details - Left */}
          <div className="flex-1 max-w-2xl p-4 sm:p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl border-0 flex flex-col items-center">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Order Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 w-full">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          </div>
          {/* Shipping Form - Right */}
          <div className="flex-1 max-w-xl p-4 sm:p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl border-0 flex flex-col items-center">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Enter Shipping Address</h3>
            <div className="w-full">
              <ShippingAddressForm cart={cart} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;