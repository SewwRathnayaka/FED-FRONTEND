import { Card } from "@/components/ui/card";

function CartItem({ item }) {
  return (
    <Card className="p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl transition-transform hover:scale-[1.025] hover:shadow-2xl border-0">
      <div className="flex items-center gap-10 min-h-[120px]">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="w-28 h-28 object-cover rounded-xl shadow-md border border-white/60 bg-white/40"
        />
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-extrabold text-2xl text-gray-900 drop-shadow-sm break-words">{item.product.name}</p>
          <p className="text-xl font-semibold text-yellow-500 drop-shadow">${item.product.price}</p>
          <span className="inline-block mt-3 px-4 py-1 bg-gray-200/80 text-gray-700 text-sm font-semibold rounded-full shadow-sm w-fit">Quantity: {item.quantity}</span>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
