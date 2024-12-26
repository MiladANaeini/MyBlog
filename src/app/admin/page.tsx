"use client";
import { fetchData, postData } from "@/common/helper/endpoint";
import { isEmpty } from "@/common/helper/helpers";
import { AdminBlogCard } from "@/components/adminBlogCard";
import { DraftCard } from "@/components/draftCard";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/constants/formSchema";
import { useDraft } from "@/lib/store/store";
import { FormValues, PostType } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";

const Admin = () => {
  const {
    refetch,
    isLoading,
    data: blogList,
    isError: isBlogListError,
  } = useQuery("blogs", () => fetchData(false));
  const {
    mutate: postBlogMutation,
    isLoading: isPostLoading,
  } = useMutation(postData, {
    onSuccess: refetch,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  {
  }

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
    <section className="p-16">
      <Card>
        <CardHeader>Create your Post</CardHeader>
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
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
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
                    {form.formState.errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">Send</Button>
                <Button
                  disabled={!!draft}
                  type="button"
                  onClick={handleDraft}
                  variant="outline"
                >
                  {isPostLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Draft
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <DraftCard onSubmit={onSubmit} />
      {isBlogListError ? (
        <div>An Error occurred</div>
      ) : (
        <>
          {isLoading ? (
            <Loading loading={isLoading} />
          ) : (
            <>
              {!isEmpty(blogList) ? (
                <Card className="mt-3 p-8">
                  <CardHeader>Posted Blogs</CardHeader>
                  {blogList?.map((item: PostType) => (
                    <AdminBlogCard key={item.id} item={item} refetch={refetch} />
                  ))}
                </Card>
              ) : (
                <div>No Blogs Found</div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
export default Admin;
