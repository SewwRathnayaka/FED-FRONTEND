// filepath: /C:/Users/DELL/Desktop/MY PLANS/STEM LINK/FED-FRONTEND - DEV/src/pages/my-orders.page.jsx
import { useGetUserOrdersQuery } from "@/store/api/baseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function MyOrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  // Add error handling
  if (error) {
    console.error('Error fetching orders:', error);
    return <div>Error loading orders: {error.message}</div>;
  }

  if (isLoading) {
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
        <main className="relative z-10 px-4 sm:px-8 pt-24 sm:pt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Orders</h2>
          <div className="mt-4 space-y-4">
            <Skeleton className="h-20 sm:h-24" />
            <Skeleton className="h-20 sm:h-24" />
            <Skeleton className="h-20 sm:h-24" />
          </div>
        </main>
      </div>
    );
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
      <main className="relative z-10 px-4 sm:px-8 pt-24 sm:pt-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Orders</h2>
        <div className="mt-4 space-y-4">
          {orders?.map((order) => (
            <div key={order._id} className="p-3 sm:p-4 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                <p className="font-semibold text-sm sm:text-base">Order #{order._id}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                    {order.orderStatus}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white/60 rounded-xl shadow border border-white/40">
                    <img
                      src={item.product?.image || 'fallback-image.jpg'}
                      alt={item.product?.name || 'No Name Available'}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg shadow border border-white/60 bg-white/40 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="font-extrabold text-sm sm:text-base text-gray-900 drop-shadow-sm">{item.product?.name || 'No Name Available'}</p>
                      <span className="text-xs sm:text-sm font-semibold text-yellow-500 drop-shadow">${item.product?.price}</span>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-200/80 text-gray-700 text-xs font-semibold rounded-full shadow-sm w-fit">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-700">
                <p className="font-medium">Shipping Address:</p>
                <p>{order.addressId?.line_1}</p>
                <p>{order.addressId?.line_2}</p>
                <p>
                  {order.addressId?.city}, {order.addressId?.state} {order.addressId?.zip_code}
                </p>
                <p>{order.addressId?.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyOrdersPage;