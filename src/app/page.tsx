import BlogPosts from "@/components/blogPosts";
import { Suspense } from "react";
import { Loading } from "../components/shared/loading";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogPosts />
    </Suspense>
  );
};
export default Home;
