import { Separator } from "@/components/ui/separator";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/api/baseApi";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCards from "./ProductCards";
import Tab from "./Tab";

function Products(props) {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const filteredProducts = products
    ? selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId)
    : [];

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
  };

  console.log({
    products,
    selectedCategoryId,
    filteredProducts
  });

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-16" />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4"></div>
        <div className="mt-4">
          <p className="text-red-500">{`Error fetching products or categories`}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-0 py-0 w-full relative flex flex-col overflow-hidden">
      {/* Blurry background image behind product cards */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('https://rspe1x6h41aadylf.public.blob.vercel-storage.com/products/Fashion1.jpeg-M2bV4H2n1Kb3K3Jdi48XB2TYSBF8ws.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.80)",
        }}
      />
      {/* Lighter overlay to soften the background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-white/40 via-white/10 to-white/40 pointer-events-none" />
      <div className="relative z-10 px-8 py-8">
        <h2 className="text-4xl font-extrabold text-black drop-shadow-2xl">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {console.log('Categories from API:', categories)}
          <Tab
            key="ALL"
            _id="ALL"
            selectedCategoryId={selectedCategoryId}
            name="All"
            onTabClick={handleTabClick}
          />
          {categories
            .filter(category => {
              console.log('Filtering category:', category);
              return category._id !== "ALL" && category.name !== "All";
            })
            .map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        {/* Product cards area with white overlay for readability */}
        <div className="mt-8 rounded-2xl p-8 shadow-xl bg-white/80 backdrop-blur-md">
          <ProductCards products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}

export default Products;
