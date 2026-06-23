import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "m37labs-portfolio-admin-token";
const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");

function readBlogs() {
  return JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
}
function writeBlogs(data: object) {
  fs.writeFileSync(blogsFile, JSON.stringify(data, null, 2));
}
function isAdmin(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${ADMIN_TOKEN}`;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { blogs } = readBlogs();
  const blog = blogs.find((b: { id: string }) => b.id === params.id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = readBlogs();
  const idx = data.blogs.findIndex((b: { id: string }) => b.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json();
  data.blogs[idx] = { ...data.blogs[idx], ...body };
  writeBlogs(data);
  return NextResponse.json({ blog: data.blogs[idx] });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = readBlogs();
  data.blogs = data.blogs.filter((b: { id: string }) => b.id !== params.id);
  writeBlogs(data);
  return NextResponse.json({ success: true });
}
