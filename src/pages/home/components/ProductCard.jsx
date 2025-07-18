import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router";
import { toast } from "sonner";

function ProductCard(props) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (props.stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        price: props.price,
        image: props.image,
        description: props.description,
        stock: props.stock
      })
    );
    toast.success("Item added to cart");
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl transition-transform hover:scale-[1.025] hover:shadow-2xl border-0">
      <Link to={`/shop/${props._id}`} className="block">
        <div className="relative flex flex-col items-center gap-4">
          <img src={props.image} alt={props.name} className="w-32 h-32 object-cover rounded-xl shadow-md border border-white/60 bg-white/40" />
          {/* Stock badge */}
          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            props.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {props.stock > 0 ? `${props.stock} in stock` : 'Out of stock'}
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 gap-1">
          <h2 className="text-xl font-extrabold text-gray-900 drop-shadow-sm text-center">{props.name}</h2>
          <span className="text-lg font-semibold text-yellow-500 drop-shadow">${props.price}</span>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-700 line-clamp-2">{props.description}</p>
        </div>
      </Link>
      <div className="mt-4">
        <Button 
          className="w-full font-bold text-base"
          onClick={handleClick}
          disabled={props.stock <= 0}
        >
          {props.stock > 0 ? 'Add To Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
