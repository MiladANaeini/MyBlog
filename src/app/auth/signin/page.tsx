"use client";
import { useMutation } from "react-query";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { credentialsSchema } from "@/constants/validationSchema";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInFormValueType } from "@/types/global";

export default function SignInPage() {
  const router = useRouter();

  const mutation = useMutation(
    async (data: SignInFormValueType) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
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
    }
  );

  const form = useForm<SignInFormValueType>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValueType) => {
    mutation.mutate(values);
  };


  return (
    <div className="flex justify-center items-center h-screen">
        <Card className="flex flex-col justify-between items-center w-full max-w-md p-8 space-y-6">
        {" "}<CardHeader className="text-2xl font-semibold text-center mb-1">
          Sign In
        </CardHeader>
        <CardContent>
        {mutation.isError && (
          <div className="text-red-500 text-sm"> {(mutation.error as { message: string })?.message || 'An error occurred'}</div>
        )}
       <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
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
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <div className="mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
        </CardContent>
        </Card>
      </div>
  );
}
