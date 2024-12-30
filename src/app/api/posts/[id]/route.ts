import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function DELETE(req: Request): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: Please log in first" }),
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400
      });
    }

    const deletedPost = await prisma.blogPost.delete({
      where: { id }
    });

    return new Response(JSON.stringify(deletedPost), { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(JSON.stringify({ message: "Error deleting post" }), {
      status: 500
    });
  }
}
