import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

function AccountPage() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
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
                <main className="relative z-10 px-4 sm:px-8 pt-24 sm:pt-32">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Account</h1>
                    <div className="text-white text-lg">Loading...</div>
                </main>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />
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
            <main className="relative z-10 px-4 sm:px-8 pt-24 sm:pt-32">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Account</h2>
                <div className="mt-4 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{user.fullName}</p>
                    <p className="text-sm sm:text-base text-gray-700">{user.emailAddresses[0].emailAddress}</p>
                </div>
            </main>
        </div>
    );
}

export default AccountPage;