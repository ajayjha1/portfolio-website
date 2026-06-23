"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

function renderMarkdown(text: string): string {
  const lines = text.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const raw of lines) {
    const line = raw
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-1 rounded text-blue-300 text-sm">$1</code>');

    if (line.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h3 class="text-xl font-bold text-white mt-8 mb-3">${line.slice(4)}</h3>`);
    } else if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4 border-b border-gray-700 pb-2">${line.slice(3)}</h2>`);
    } else if (line.startsWith("# ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h1 class="text-3xl font-bold text-white mt-12 mb-5">${line.slice(2)}</h1>`);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { html.push('<ul class="list-disc pl-6 space-y-2 my-4 text-gray-300">'); inList = true; }
      html.push(`<li>${line.slice(2)}</li>`);
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push("<br/>");
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p class="text-gray-300 leading-relaxed mb-4">${line}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("");
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.blogs as Blog[]).find((b) => b.slug === params.slug);
        if (found) setBlog(found);
        else setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      <div className="max-w-3xl w-full mt-10">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {notFound && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">Post not found.</p>
            <Link href="/Blog" className="text-blue-400 hover:text-blue-300">← Back to Blog</Link>
          </div>
        )}

        {blog && (
          <>
            <Link href="/Blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Back to Blog
            </Link>

            <article>
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-900/40 text-blue-300 rounded-full border border-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{blog.title}</h1>
                <p className="text-gray-400 text-sm">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="h-px bg-gradient-to-r from-blue-700 via-gray-700 to-transparent mt-6" />
              </div>

              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
              />
            </article>
          </>
        )}
      </div>
    </main>
  );
}
