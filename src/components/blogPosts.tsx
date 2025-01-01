import { fetchData } from "@/common/helper/endpoint";
import { PostType } from "@/types/global";
import { BlogCard } from "./blogCard";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";

export default async function BlogPosts() {
  const data = await fetchData();

  return (
    <section className="p-16">
      {data && (
        <Card className="mt-3 p-8">
          <CardHeader>Posted Blogs</CardHeader>
          {data.length ? (
            <>
              {data.map((item: PostType) => (
                <BlogCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            <div className="bg-yellow-100 mt-3 p-4">
              No blog posts have been created.
              <Link href="/auth/signin">
                <span className="text-sm font-bold text-blue-500">
                  Sign In{" "}
                </span>
              </Link>
              to start creating posts.
            </div>
          )}
        </Card>
      )}
    </section>
  );
}
