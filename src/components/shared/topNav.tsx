"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const TopNav = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" }); // Sign the user out and redirect to the homepage
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-white px-5 py-2 shadow-xl text-black">
      <Link href="/">
        <h3 className="text-lg font-bold">VISUAL</h3>
      </Link>
      <div className="flex flex-row space-x-4">
        <Link href="/">
          <p className="text-sm  font-bold">Posts</p>
        </Link>
        {status === "loading"
          ? <p className="text-sm font-bold">Loading...</p>
          : session
            ? <button
                onClick={handleSignOut}
                className="text-sm font-bold text-red-500 hover:underline"
              >
                Sign Out
              </button>
            : <Link href="/auth/signin">
                <p className="text-sm font-bold">Sign In</p>
              </Link>}
      </div>
    </header>
  );
};

export default TopNav;
