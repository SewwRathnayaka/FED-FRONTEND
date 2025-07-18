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
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      <main className="relative z-10 px-8 pt-32">
        <h2 className="text-4xl font-bold">Review Your Order</h2>
        <div className="mt-4 grid grid-cols-4 gap-x-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="mt-4">
          <p>
            Total Price: $
            {cart.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}
          </p>
        </div>
        <div className="mt-4">
          <CheckoutForm orderId={orderId} />
        </div>
      </main>
    </div>
  );
}

export default PaymentPage;