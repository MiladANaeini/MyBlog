import { fetchData } from "@/common/helper/endpoint";
import { PostType } from "@/types/global";
import { BlogCard } from "./blogCard";
import { Card, CardHeader } from "./ui/card";

export default async function BlogPosts() {
  const data = await fetchData();

  return (
    <section className="p-16">
    <Card className="mt-3 p-8">
      <CardHeader>Posted Blogs</CardHeader>
      {data?.map((item: PostType) => (
        <BlogCard key={item.id} item={item} />
      ))}
    </Card>
    </section>
  );
}
