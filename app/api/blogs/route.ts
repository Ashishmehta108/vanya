import { Blog } from "@/lib/blog/blog";
import { BlogPost } from "@/lib/blog/blogpost/blogpost";
import BlogSeed from "@/lib/blog/seed";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const blogs = await Blog.find().select("-content");
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectToDatabase();

  // const body = await request.json();

  const newBlog = await Blog.create(BlogSeed);
  BlogSeed.blogPosts.forEach(async (post) => {
    await BlogPost.create(post);
  });
  // const BlogPosts=await BlogPost.create(body);
  try {
    return NextResponse.json({
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await connectToDatabase();

  const body = await request.json();

  const updatedBlog = await Blog.findByIdAndUpdate(
    body.id,
    { $set: body },
    { new: true }
  );
  try {
    return NextResponse.json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
