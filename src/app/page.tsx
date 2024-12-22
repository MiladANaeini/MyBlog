"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(30, "Name must be at most 50 characters"),
  description: z.string().min(2, "Description must be at least 2 characters").max(500, "Description must be at most 500 characters"),
});
type FormValues = z.infer<typeof formSchema>;


export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
   <section className="p-5">
    <Card>
    <CardHeader>Hello World</CardHeader>
      <CardContent>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               {/* Buttons */}
               <div className="flex gap-2">
                <Button type="submit">Send</Button>
                <Button type="button" variant="outline">
                  Draft
                </Button>
              </div>
            </form>
         </Form>

      </CardContent>
   </Card>
    <Card className="mt-3">
    <CardHeader>Posted Blogs</CardHeader>
      <CardContent>
      <p>The blogs 0</p>
      </CardContent>
      <CardContent>
      <p>The blogs 1</p>
      </CardContent>
   </Card>
   </section>
  );
}
