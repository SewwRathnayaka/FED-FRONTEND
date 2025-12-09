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
          backgroundImage: "url('/assets/products/Fashion1.jpeg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 bg-white/70 rounded-xl px-6 py-2 shadow-lg mb-8 backdrop-blur-md">My Cart</h2>
        <div className="w-full max-w-6xl">
          {cart.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                {cart.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
              <div className="mt-8 w-full max-w-md mx-auto">
                <Button
                  asChild
                  className="w-full rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition py-3 mt-2"
                >
                  <Link to="/shop/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-white text-xl font-semibold bg-white/20 backdrop-blur-md rounded-xl px-8 py-4 inline-block">No items in cart</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CartPage;
