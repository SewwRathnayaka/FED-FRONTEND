import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default RootLayout;
