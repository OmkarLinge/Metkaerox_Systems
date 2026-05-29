import type { Metadata } from "next";
import BlogPageContent from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog | Metkaerox Systems",
  description:
    "Read Metkaerox Systems updates and insights on UAVs, aerial intelligence, and autonomous systems.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
