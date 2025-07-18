import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
}

export default RootLayout;
