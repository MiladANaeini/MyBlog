"use client";
import { useMutation } from "react-query";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const mutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    {
      onSuccess: () => {
        router.push("/admin");
      },
      onError: (err: any) => {
        setError(err.message); // Display the error message
      },
    }
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center">
          <p className="mt-4">
            Do not have an account?{" "}
            <a href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
