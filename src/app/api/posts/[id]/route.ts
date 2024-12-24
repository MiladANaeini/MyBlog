import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req: Request): Promise<Response> {
  try {
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
