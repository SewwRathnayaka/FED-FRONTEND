import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
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
      <main className="flex items-center justify-center px-4 min-h-screen relative z-10 pt-32">
        <SignUp />
      </main>
    </div>
  );
}