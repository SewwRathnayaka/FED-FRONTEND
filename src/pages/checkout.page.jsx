import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import CartItem from "@/components/CartItem";
import { useCreatePaymentIntentMutation } from "@/store/api/baseApi";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
      return;
    }

    const totalAmount = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    createPaymentIntent({ amount: totalAmount })
      .unwrap()
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        toast.error("Failed to initialize payment");
        console.error("Error creating payment intent:", error);
      });
  }, [cart, createPaymentIntent, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Checkout Page</h2>
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Order Details</h3>
        <div className="mt-2 grid grid-cols-4 gap-x-4">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Payment Details</h3>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
