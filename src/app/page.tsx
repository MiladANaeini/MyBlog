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
import { v4 as uuidv4 } from 'uuid';
import {useDraft} from "../lib/store/store"
import { DraftCard } from "@/components/draftCard";
import { formSchema } from "@/constants/formSchema"


type FormValues = z.infer<typeof formSchema>;


export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
   const {draft , setDraft} = useDraft()


    const onSubmit = (formValue: FormValues) => {
    const id = uuidv4();
    const formData = {...formValue,id}
    form.reset();
    };


    const handleDraft = ()=>{
      const draftValues = form.getValues();
      setDraft(draftValues)
      form.reset();
    }
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
                    {form.formState.errors.name && (
                       <p className="text-red-500 text-sm mt-1">
                         {form.formState.errors.name.message}
                       </p>)}
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
                disabled={draft}
                type="button"   onClick={handleDraft}
                 variant="outline">
                  Draft
                </Button>
              </div>
            </form>
         </Form>
      </CardContent>
   </Card>
   {draft ? 
   
   <DraftCard form={form} draft={draft} 
   handleDraft={handleDraft} onSubmit={onSubmit} /> : null
  }
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
