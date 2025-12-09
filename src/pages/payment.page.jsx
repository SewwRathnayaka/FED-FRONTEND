import CartItem from "@/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import CheckoutForm from "./CheckoutForm";
import { useSearchParams } from "react-router";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-8">Review Your Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
          <div className="mt-8 bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-md">
            <p className="text-2xl font-bold text-gray-900">
              Total Price: $
              {cart.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )}
            </p>
          </div>
          <div className="mt-8">
            <CheckoutForm orderId={orderId} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentPage;