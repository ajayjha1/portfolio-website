"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  date: string;
  published: boolean;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => setBlogs(d.blogs || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      <div className="max-w-3xl w-full mt-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-4">
            Research & Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Thoughts on AI, full-stack development, and software engineering.
          </p>
          <div className="h-px bg-gradient-to-r from-blue-700 via-gray-700 to-transparent mt-6" />
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-2">No posts yet.</p>
            <p className="text-gray-600">Check back soon — research posts coming shortly.</p>
          </div>
        )}

        <div className="space-y-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/Blog/${blog.slug}`}>
              <div className="group bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-700 hover:bg-gray-900/80 transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                      {blog.title}
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-blue-900/40 text-blue-300 rounded-full border border-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap mt-1">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
