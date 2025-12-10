import { Button } from "@/components/ui/button";
import { useGetCheckoutSessionStatusQuery } from "@/store/api/baseApi";
import { Link, useSearchParams, Navigate } from "react-router";
import PageLoader from "@/components/PageLoader";

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError, error } =
    useGetCheckoutSessionStatusQuery(sessionId, {
      skip: !sessionId, // Skip query if no sessionId
    });

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full">
        <PageLoader message="Finalizing your order..." />
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Invalid Session</h2>
          <p className="mb-4">No session ID found. Please complete your checkout.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Order</h2>
          <p className="mb-4">{error?.data?.error || error?.message || "Failed to retrieve order status"}</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
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
        <section id="success" className="relative z-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-32">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Order Completed Successfully!</h2>
          <p className="mb-4">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-semibold">{data.customer_email}</span>.
          </p>
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
            <p className="mb-2">Order ID: <span className="font-medium">{data.orderId}</span></p>
            <p className="mb-2">Order Status: <span className="font-medium">{data.orderStatus}</span></p>
            <p className="mb-2">Payment Status: <span className="font-medium">{data.paymentStatus}</span></p>
          </div>
          <div className="mt-6">
            <p>
              If you have any questions, please email{" "}
              <a href="mailto:orders@example.com" className="text-blue-600 hover:underline">
                orders@example.com
              </a>.
            </p>
          </div>
          <Button asChild className="mt-6">
            <Link to="/">Return to Home</Link>
          </Button>
        </section>
      </div>
    );
  }

  return null;
}

export default CompletePage;