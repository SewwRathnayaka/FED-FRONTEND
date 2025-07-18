import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.value);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurry background image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      <main className="relative z-10 px-8 pt-32 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 bg-white/70 rounded-xl px-6 py-2 shadow-lg mb-8 backdrop-blur-md">My Cart</h2>
        <div className="mt-4 grid grid-cols-2 w-1/2 gap-x-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="mt-4 w-1/2 flex justify-center">
          {cart.length > 0 ? (
            <Button
              asChild
              className="w-full rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition py-3 mt-2"
            >
              <Link to="/shop/checkout">Proceed to Checkout</Link>
            </Button>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CartPage;
