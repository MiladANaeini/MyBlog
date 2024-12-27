import { deleteData } from "@/common/helper/endpoint";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useMutation } from "react-query";
import { AdminBlogCardType } from "../types/global";
import { formattedDate } from "@/common/helper/helpers";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const AdminBlogCard = ({ item, refetch }: AdminBlogCardType) => {
  const {
    mutate: deleteBlogMutation,
    isLoading: isDeleteLoading
  } = useMutation(deleteData, {
    onSuccess: refetch
  });

  const handleDelete = () => {
    deleteBlogMutation(item.id);
  };

  return (
    <Card key={item.id} className="bg-teal-200 p-3 m-4">
      <CardContent>
        <p className="font-bold">
          Name: {item.name}
        </p>
        <div className="mb-2 mt-3 grid grid-cols-[25px_1fr] items-start pb-3">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Description:</p>
            <ReactMarkdown className="prose mt-1" rehypePlugins={[rehypeRaw]}>
              {item.description || "No description available."}
            </ReactMarkdown>
          </div>
        </div>
        <p className="text-sm text-muted-foreground ">
          Created At: {formattedDate(item.createdAt)}
        </p>
        <div className="flex gap-2 mt-3">
          <Button type="button" onClick={handleDelete} variant="destructive">
            {isDeleteLoading &&
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
