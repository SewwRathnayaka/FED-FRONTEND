import { Card } from "@/components/ui/card";

function CartItem({ item }) {
  return (
    <Card className="p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl transition-transform hover:scale-[1.025] hover:shadow-2xl border-0">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10 min-h-[120px]">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-xl shadow-md border border-white/60 bg-white/40 flex-shrink-0"
        />
        <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
          <p className="font-extrabold text-lg sm:text-xl md:text-2xl text-gray-900 drop-shadow-sm break-words">{item.product.name}</p>
          <p className="text-lg sm:text-xl font-semibold text-yellow-500 drop-shadow">${item.product.price}</p>
          <span className="inline-block mt-2 sm:mt-3 px-3 sm:px-4 py-1 bg-gray-200/80 text-gray-700 text-xs sm:text-sm font-semibold rounded-full shadow-sm w-fit mx-auto sm:mx-0">Quantity: {item.quantity}</span>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
