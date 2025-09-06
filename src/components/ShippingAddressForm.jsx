import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  line_1: z.string().min(1, "Address line 1 is required"),
  line_2: z.string().min(1, "Address line 2 is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  phone: z.string().refine(
    (value) => /^\+?[1-9]\d{1,14}$/.test(value),
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line_1: '',
      line_2: '',
      city: '',
      state: '',
      zip_code: '',
      phone: ''
    }
  });
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      // Format cart items correctly
      const orderItems = cart.map(item => ({
        product: {
          _id: item._id || item.product._id,
          name: item.name || item.product.name,
          price: Number(item.price) || Number(item.product.price),
          image: item.image || item.product.image,
          description: item.description || item.product.description,
          stripePriceId: item.stripePriceId || item.product.stripePriceId // Add this line
        },
        quantity: Number(item.quantity)
      }));

      console.log('Formatted order items:', orderItems);

      const orderData = {
        items: orderItems,
        shippingAddress: values
      };

      const response = await createOrder(orderData).unwrap();
      
      if (!response?.orderId) {
        throw new Error('Order creation failed - no order ID received');
      }
      
      navigate(`/shop/payment?orderId=${response.orderId}`);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.data?.message || "Failed to create order");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Address Line 1</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="16/1" 
                      {...field}
                      value={field.value || ''} // Add this to ensure value is never undefined
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">City</FormLabel>
                  <FormControl>
                    <Input placeholder="Kadawatha" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Wester Province" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94702700100" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 sm:mt-6">
            <Button type="submit" className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">Proceed to Payment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;