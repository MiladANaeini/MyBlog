"use client";
import { useMutation } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong");
      }

      return res.json();
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      },
      onError: (err: any) => {
        alert(err.message);
      }
    }
  );

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        {mutation.isError &&
          <p className="text-red-500 text-sm">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Something went wrong"}
          </p>}
        {mutation.isSuccess &&
          <p className="text-green-500 text-sm">
            Registration successful! Redirecting to sign in...
          </p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center">
          <p className="mt-4">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
