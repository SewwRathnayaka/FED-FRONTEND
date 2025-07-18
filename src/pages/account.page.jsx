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
                <main className="relative z-10 px-8 pt-32">
                    <h1>My Account</h1>
                    <div>Loading...</div>
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
            <main className="relative z-10 px-8 pt-32">
                <h2 className="text-4xl font-bold">My Account</h2>
                <div className="mt-4">
                    <p>{user.fullName}</p>
                    <p>{user.emailAddresses[0].emailAddress}</p>
                </div>
            </main>
        </div>
    );
}

export default AccountPage;