import { Loader2 } from "lucide-react";

function PageLoader({ message = "Loading..." }) {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      style={{
        willChange: 'opacity',
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className="flex flex-col items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40">
        <Loader2 className="h-10 w-10 text-yellow-500 animate-spin drop-shadow" />
        <p className="text-gray-800 text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
}

export default PageLoader;

