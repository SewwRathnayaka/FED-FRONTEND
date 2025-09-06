import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/store/api/baseApi";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCards from "../home/components/ProductCards";
import Tab from "../home/components/Tab";

function ShopPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("none");

  const { data: products, isLoading: isProductsLoading, isError: isProductsError, error: productsError } = useGetProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useGetCategoriesQuery();

  // Debug logging
  console.log('ShopPage API Debug:', {
    products,
    isProductsLoading,
    isProductsError,
    productsError,
    categories,
    isCategoriesLoading,
    isCategoriesError,
    categoriesError
  });

  // Extract the actual products array from the nested structure
  const actualProducts = products?.products || [];

  // Debug the actual products structure
  if (products) {
    console.log('ShopPage Products structure:', {
      products,
      productsKeys: Object.keys(products),
      actualProducts,
      actualProductsLength: actualProducts.length,
      firstProduct: actualProducts[0]
    });
  }

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.7)",
          }}
        />
        <main className="relative z-10 px-4 sm:px-8 py-16 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </main>
      </div>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.7)",
          }}
        />
        <main className="relative z-10 px-4 sm:px-8 py-16 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">API Error</h2>
            <p className="text-red-500 mb-2">Failed to load products or categories</p>
            <p className="text-red-400 text-sm mb-2">
              Products Error: {productsError?.message || 'Unknown error'}
            </p>
            <p className="text-red-400 text-sm mb-4">
              Categories Error: {categoriesError?.message || 'Unknown error'}
            </p>
            <p className="text-yellow-600 text-sm">
              Check browser console for more details
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Filter products by category
  const filteredProducts = actualProducts && Array.isArray(actualProducts)
    ? selectedCategoryId === "ALL" 
      ? actualProducts 
      : actualProducts.filter(product => product.categoryId === selectedCategoryId)
    : [];

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-page blurred background image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.7)",
        }}
      />
      {/* Content overlay */}
      <main className="relative z-10 px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 w-full sm:w-auto">
            <Tab
              key="ALL"
              _id="ALL"
              selectedCategoryId={selectedCategoryId}
              name="All"
              onTabClick={setSelectedCategoryId}
            />
            {categories && Array.isArray(categories) && categories
              .filter(category => category._id !== "ALL" && category.name !== "All")
              .map((category) => (
                <Tab
                  key={category._id}
                  _id={category._id}
                  selectedCategoryId={selectedCategoryId}
                  name={category.name}
                  onTabClick={setSelectedCategoryId}
                />
              ))}
          </div>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product cards area with extra overlay for readability */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-xl">
          <ProductCards products={sortedProducts} />
        </div>
      </main>
    </div>
  );
}

export default ShopPage;