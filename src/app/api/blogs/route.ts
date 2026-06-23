import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "m37labs-portfolio-admin-token";
const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");

function readBlogs() {
  const raw = fs.readFileSync(blogsFile, "utf-8");
  return JSON.parse(raw) as { blogs: Blog[] };
}

function writeBlogs(data: { blogs: Blog[] }) {
  fs.writeFileSync(blogsFile, JSON.stringify(data, null, 2));
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  published: boolean;
}

function isAdmin(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  return auth === `Bearer ${ADMIN_TOKEN}`;
}

export async function GET(req: NextRequest) {
  const { blogs } = readBlogs();
  const admin = isAdmin(req);
  const result = admin ? blogs : blogs.filter((b) => b.published);
  return NextResponse.json({ blogs: result });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: Omit<Blog, "id"> = await req.json();
  const data = readBlogs();
  const newBlog: Blog = { ...body, id: Date.now().toString() };
  data.blogs.unshift(newBlog);
  writeBlogs(data);
  return NextResponse.json({ blog: newBlog }, { status: 201 });
}
