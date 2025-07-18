import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation, useGetCategoriesQuery } from "@/store/api/baseApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect } from "react";

// Remove stripePriceId from the schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image URL is required"),
  // REMOVE stripePriceId
});

function AdminProductCreatePage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      image: "",
      // REMOVE stripePriceId
    }
  });

  // Add useEffect for token verification
  useEffect(() => {
    async function verifyToken() {
      try {
        const session = await window.Clerk?.session;
        // Updated template name
        const token = await session?.getToken({ template: 'admin-role' });
        
        console.log('Token Verification:', {
          hasSession: !!session,
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 50)}...` : 'No token',
          sessionId: session?.id,
          role: session?.user?.publicMetadata?.role
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        toast.error('Failed to verify admin access');
      }
    }

    verifyToken();
  }, []);

  async function onSubmit(values) {
    try {
      const session = await window.Clerk?.session;
      const token = await session?.getToken({ template: 'admin-role' });

      const productData = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
        categoryId: values.categoryId,
        image: values.image.trim(),
      };

      console.log("🟢 Submitting product data:", productData);

      const result = await createProduct(productData).unwrap();

      console.log("✅ Product creation result:", result);

      toast.success("Product created successfully");
      form.reset();
    } catch (error) {
      console.error('❌ Product creation failed:', error);
      toast.error(error.data?.message || "Failed to create product");
    }
  }

  // Show loading state while categories load
  if (categoriesLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(0.75)",
          }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-white/40 via-white/10 to-white/40 pointer-events-none" />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32">
          {/* Heading below Mebius */}
          <h2 className="text-2xl font-bold text-gray-900 bg-white/70 rounded-xl px-6 py-2 shadow-lg mb-8 backdrop-blur-md">Create Product</h2>
          <div className="mt-4 max-w-xl w-full p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border-0">
            <div className="text-lg font-semibold text-gray-700">Loading categories...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.75)",
        }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-white/40 via-white/10 to-white/40 pointer-events-none" />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32">
        {/* Heading below Mebius */}
        <h2 className="text-2xl font-bold text-gray-900 bg-white/70 rounded-xl px-4 py-2 shadow-lg mb-4 backdrop-blur-md">Create Product</h2>
        <div className="max-w-xl w-full p-10 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl mb-6 border-0 gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Name</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl  bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400" placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Description</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400" placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="rounded-xl bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Stock</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        className="rounded-xl bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl bg-white/80 shadow-lg">
                        {categories?.map(category => (
                          <SelectItem key={category._id} value={category._id} className="rounded-xl">
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-800">Image URL</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl bg-white/60 border border-white/40 shadow px-4 py-2 focus:ring-2 focus:ring-yellow-400" placeholder="Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !categories?.length}
                className="w-full rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition py-3 mt-2"
              >
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

export default AdminProductCreatePage;
