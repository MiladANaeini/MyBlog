"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Admin from "./admin";

const AdminContainer = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(
    () => {
      if (status === "unauthenticated") {
        router.push("/auth/signin");
      }
    },
    [router, status]
  );

  if (status === "loading") {
    return <p className="text-sm font-bold">Loading...</p>;
  }

  return session ? <Admin /> : null;
};

export default AdminContainer;
