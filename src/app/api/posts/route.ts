import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();
export async function POST(req: Request): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: Please log in first" }),
        { status: 401 }
      );
    }
    const body = await req.json();
    const { name, description }: { name: string; description: string } = body;

    if (!name || !description) {
      return new Response(
        JSON.stringify({ message: "Name and description are required" }),
        {
          status: 400
        }
      );
    }

    const newPost = await prisma.blogPost.create({
      data: { name, description }
    });

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ message: "Error creating post" }), {
      status: 500
    });
  }
}

export async function GET(): Promise<Response> {
  try {
    const posts = await prisma.blogPost.findMany();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ message: "Error fetching posts" }), {
      status: 500
    });
  }
}
