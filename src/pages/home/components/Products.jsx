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

  // Debug logging
  console.log('Products API Debug:', {
    products,
    isProductsLoading,
    isProductsError,
    productsError,
    dataType: typeof products,
    isArray: Array.isArray(products)
  });

  // Extract the actual products array from the nested structure
  const actualProducts = products?.products || [];

  // Debug the actual products structure
  if (products) {
    console.log('Products structure:', {
      products,
      productsKeys: Object.keys(products),
      actualProducts,
      actualProductsLength: actualProducts.length,
      firstProduct: actualProducts[0]
    });
  }

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  
  const filteredProducts = actualProducts && Array.isArray(actualProducts)
    ? selectedCategoryId === "ALL"
      ? actualProducts
      : actualProducts.filter((product) => product.categoryId === selectedCategoryId)
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
      <section className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <Skeleton className="h-12 sm:h-16 w-20 sm:w-24 flex-shrink-0" />
          <Skeleton className="h-12 sm:h-16 w-20 sm:w-24 flex-shrink-0" />
          <Skeleton className="h-12 sm:h-16 w-20 sm:w-24 flex-shrink-0" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-64 sm:h-80" />
          <Skeleton className="h-64 sm:h-80" />
          <Skeleton className="h-64 sm:h-80" />
          <Skeleton className="h-64 sm:h-80" />
        </div>
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4"></div>
        <div className="mt-4">
          <p className="text-red-500">Error fetching products or categories</p>
          <p className="text-red-400 text-sm mt-2">
            Products Error: {productsError?.message || 'Unknown error'}
          </p>
          <p className="text-red-400 text-sm">
            Categories Error: {categoriesError?.message || 'Unknown error'}
          </p>
          <p className="text-yellow-600 text-sm mt-2">
            Check browser console for more details
          </p>
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
      <div className="relative z-10 px-4 sm:px-8 py-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-black drop-shadow-2xl">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {console.log('Categories from API:', categories)}
          <Tab
            key="ALL"
            _id="ALL"
            selectedCategoryId={selectedCategoryId}
            name="All"
            onTabClick={handleTabClick}
          />
          {categories && Array.isArray(categories) && categories
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
        <div className="mt-6 sm:mt-8 rounded-2xl p-4 sm:p-8 shadow-xl bg-white/80 backdrop-blur-md">
          <ProductCards products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}

export default Products;
