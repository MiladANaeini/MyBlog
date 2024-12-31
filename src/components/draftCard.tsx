import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDraft } from "../lib/store/store"
import { formSchema } from "@/constants/validationSchema"
import { DraftCardType } from "../types/global"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const DraftCard = ({ onSubmit }: DraftCardType) => {

  const { draft, setDraft } = useDraft()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: draft?.name || "",
      description: draft?.description || "",
    },
  })

  const { setValue, handleSubmit } = form;

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    setDraft(null);
  });

  const handleSaveDraft = handleSubmit((data) => {
    setDraft(data);
  });


  const handleRemove = () => {
    setDraft(null)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/markdown" && !file.name.endsWith(".md")) {
        alert("Please upload a valid Markdown file.");
        return;
      }
      const text = await file.text();
      setValue("description", text);
    }
  };

  return (
    <>
      <Card className="bg-yellow-100 mt-3">
        <CardHeader>Draft Form</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </div>)}
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
                      <Textarea
                        placeholder="Enter a description"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.description && (
                      <div className="text-red-500 text-sm mt-1">
                        {form.formState.errors.description.message}
                      </div>)}
                    <p className="text-sm text-gray-500 mt-2">
                      You can use Markdown syntax here.
                    </p>
                    <div className="mt-4 p-4 border rounded-md bg-gray-50">
                      <p className="text-sm font-semibold">Preview:</p>
                      <ReactMarkdown className="prose mt-2"
                        rehypePlugins={[rehypeRaw]}
                      >
                        {field.value || "Start typing to see a live preview..."}
                      </ReactMarkdown>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">Send</Button>
                <Button
                  type="button" 
                  onClick={handleRemove} 
                  variant="destructive">
                  Delete
                </Button>
                <Button
                 type="button"
                  variant="outline"
                  onClick={handleSaveDraft}>Save</Button>
                <Input
                  id="picture"
                  type="file"
                  accept=".md,text/markdown"
                  onChange={handleFileUpload}
                  className=" cursor-pointer file:bg-blue-50
                 file:text-blue-700 hover:file:bg-blue-100 max-w-52 "
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}