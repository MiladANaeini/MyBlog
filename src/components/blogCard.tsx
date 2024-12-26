import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";
import { BlogCardType } from "../types/global";
import { deleteData } from "@/common/helper/endpoint";

export const BlogCard = ({ item, refetch }: BlogCardType) => {
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
        <p>
          Name: {item.name}
        </p>
        <div className="mb-2 mt-3 grid grid-cols-[25px_1fr] items-start pb-3">
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
        <p className="text-sm text-muted-foreground ">
          {item.id}
        </p>
        <div className="flex gap-2">
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
