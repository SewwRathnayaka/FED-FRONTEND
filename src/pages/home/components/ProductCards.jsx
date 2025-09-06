import ProductCard from "./ProductCard";

function ProductCards(props) {
  // Add safety check for products array
  if (!props.products || !Array.isArray(props.products)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <div className="col-span-full text-center text-gray-500 py-8">
          No products available
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {props.products.map((product) => {
        return (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            stock={product.stock}
          />
        );
      })}
    </div>
  );
}

export default ProductCards;
