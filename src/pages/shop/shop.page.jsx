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

  const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  if (isProductsLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  // Filter products by category
  const filteredProducts = selectedCategoryId === "ALL" 
    ? products 
    : products.filter(product => product.categoryId === selectedCategoryId);

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
      <main className="relative z-10 px-8 py-16">
        <div className="flex justify-between items-center mt-4 mb-8">
          <div className="flex items-center gap-4">
            <Tab
              key="ALL"
              _id="ALL"
              selectedCategoryId={selectedCategoryId}
              name="All"
              onTabClick={setSelectedCategoryId}
            />
            {categories
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
            <SelectTrigger className="w-[180px]">
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
        <div className="rounded-2xl bg-white/70 backdrop-blur-md p-8 shadow-xl">
          <ProductCards products={sortedProducts} />
        </div>
      </main>
    </div>
  );
}

export default ShopPage;