import { Separator } from "@/components/ui/separator";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/api/baseApi";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCards from "./ProductCards";
import Tab from "./Tab";

function Products() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError
  } = useGetProductsQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError
  } = useGetCategoriesQuery();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return selectedCategoryId === "ALL" 
      ? products 
      : products.filter(product => product.categoryId === selectedCategoryId);
  }, [products, selectedCategoryId]);

  // Handle loading state
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

  // Handle error state
  if (isProductsError || isCategoriesError) {
    console.error("Products Error:", productsError);
    console.error("Categories Error:", categoriesError);
    return (
      <div className="p-4 text-red-500">
        Error loading data: {productsError?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center gap-4">
        <Tab
          key="ALL"
          _id="ALL"
          selectedCategoryId={selectedCategoryId}
          name="All"
          onTabClick={setSelectedCategoryId}
        />
        {categories?.map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={setSelectedCategoryId}
          />
        ))}
      </div>
      <ProductCards products={filteredProducts} />
    </section>
  );
}

export default Products;
