import { BlogPost } from "@/lib/blog/blogpost/blogpost";
import getBlogPostById from "@/lib/getBlogPostbyId";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(id);
  const blogPost = await getBlogPostById(id);
  return NextResponse.json({
    message: "Blog post fetched successfully",
    blogPost,
  });
}




export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.json();
  const blogPost = await BlogPost.findByIdAndUpdate(id, { $set: body });
  return NextResponse.json({
    message: "Blog post updated successfully",
    blogPost,
  });
}


