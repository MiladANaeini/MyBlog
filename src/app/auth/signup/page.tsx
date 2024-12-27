"use client";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import Link from "next/link";
import { signUpSchema } from "@/constants/formSchema";

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();

  const mutation = useMutation(
    async (data: SignUpFormValues) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
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
      }
    }
  );
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: SignUpFormValues) => {
    mutation.mutate(values);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="flex flex-col justify-between items-center w-full max-w-md p-8 space-y-6">
        {" "}<CardHeader className="text-2xl font-semibold text-center mb-1">
          Sign Up
        </CardHeader>
        <CardContent>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <p className="mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
