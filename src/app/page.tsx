"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useDraft } from "../lib/store/store";
import { DraftCard } from "@/components/draftCard";
import { formSchema } from "@/constants/formSchema";
import { useMutation, useQuery } from "react-query";

type FormValues = z.infer<typeof formSchema>;

const fetchData = async () => {
  const response = await fetch("/api/posts");
  return response.json();
};
const postData = async (formValue: FormValues) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValue),
  });
  const data = await response.json();
  return data;
};


const Home = () => {
  const {refetch, isLoading, data: blogList } = useQuery("blogs", fetchData);
  const { mutate: postBlogMutation, isLoading: isLoadingPost, isError, error } = useMutation(postData, {
    onSuccess:refetch
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { draft, setDraft } = useDraft();

  const onSubmit = async (formValue: FormValues) => {
      postBlogMutation(formValue); 
      form.reset();
  };

  const handleDraft = () => {
    const draftValues = form.getValues();
    setDraft(draftValues);
    form.reset();
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
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    {form.formState.errors.name &&
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>}
                  </FormItem>}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a description" {...field} />
                    </FormControl>
                    {form.formState.errors.description &&
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.description.message}
                      </p>}
                  </FormItem>}
              />
              <div className="flex gap-2">
                <Button type="submit">Send</Button>
                <Button
                  disabled={draft}
                  type="button"
                  onClick={handleDraft}
                  variant="outline"
                >
                  Draft
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {draft ? <DraftCard onSubmit={onSubmit} /> : null}
      <Card className="mt-3 p-8">
        <CardHeader>Posted Blogs</CardHeader>
        {blogList?.map(item =>
          <Card key={item.id} className="bg-slate-100 p-3 m-4">
            <CardContent>
              <p>Name: {item.name}</p>
            <div
              className="mb-2 mt-3 grid grid-cols-[25px_1fr] items-start pb-3"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.description}
                </p>
              </div>
            </div>
                <p className="text-sm text-muted-foreground ">
                  Created At: {item.createdAt}
                </p>
            </CardContent>
          </Card>
        )}
      </Card>
    </section>
  );
};
export default Home;
