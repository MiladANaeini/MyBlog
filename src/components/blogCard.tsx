import { Card, CardContent } from "@/components/ui/card";
import { BlogCardType } from "../types/global";
import { formattedDate } from "@/common/helper/helpers";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const BlogCard = ({ item }: BlogCardType) => {
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
      </CardContent>
    </Card>
  );
};
