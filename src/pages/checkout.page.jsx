import { useEffect } from "react";
import { useCreateCheckoutSessionMutation } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CheckoutForm = ({ orderId }) => {
  const { getToken } = useAuth();

  const fetchClientSecret = useCallback(async () => {
    try {
      const token = await getToken();
      console.log('Initiating checkout for order:', orderId); // Debug log
      
      if (!orderId) {
        throw new Error('Order ID is missing');
      }

      const response = await fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          orderId: orderId.toString() // Ensure orderId is a string
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Checkout error:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const data = await response.json();
      console.log('Checkout session created:', data); // Debug log
      return data.clientSecret;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  }, [orderId, getToken]);

  // Log when component mounts
  useEffect(() => {
    console.log('CheckoutForm mounted with orderId:', orderId);
  }, [orderId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;