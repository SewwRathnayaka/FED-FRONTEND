import ProductCard from "./ProductCard";

function ProductCards(props) {
  // Ensure products is always an array
  const products = Array.isArray(props.products) ? props.products : [];
  
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {products.map((product) => {
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
