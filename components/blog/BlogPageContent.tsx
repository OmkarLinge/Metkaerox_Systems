"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import { blogPosts } from "@/data/blog";
import SiteShell from "@/components/layout/SiteShell";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/shared/Section";
import { Input } from "@/components/shared/form";

function BlogSearch({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch: (value: string) => void;
}) {
  return (
    <div className="relative mx-auto mt-8 max-w-xl">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />
      <Input
        type="search"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        className="pl-12"
      />
    </div>
  );
}

function BlogPostCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <article className="group grid gap-6 border-b border-[var(--border)] pb-10 md:grid-cols-[18rem_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] md:aspect-auto md:h-52">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 288px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--button-contrast)]">
          {post.category}
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <User size={13} />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} />
            {post.date}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-black uppercase leading-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">
          {post.excerpt}
        </p>
        <Button href="/contact" variant="ghost" className="mt-5 justify-start px-0">
          Read Full Article
          <ArrowRight size={14} />
        </Button>
      </div>
    </article>
  );
}

function BlogSidebar() {
  return (
    <aside className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-black uppercase text-[var(--text)]">
          Write for us
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          Share practical field notes on drone technology, GIS, inspections, and
          aerial intelligence with the Metkaerox community.
        </p>
        <Button href="/contact" className="mt-6 w-full">
          Submit Proposal
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-black uppercase text-[var(--text)]">
          Newsletter
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          Get UAV product updates, deployment notes, and engineering insights.
        </p>
        <div className="mt-5 grid gap-3">
          <Input type="email" placeholder="Email address" />
          <Button type="button" variant="secondary">
            Subscribe
          </Button>
        </div>
      </Card>
    </aside>
  );
}

export default function BlogPageContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return blogPosts;

    return blogPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized) ||
        post.category.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm]);

  return (
    <SiteShell>
      <Section className="pt-12">
        <PageHeader
          eyebrow="Blog"
          title={
            <>
              Aerial <span className="text-[var(--accent)]">Intelligence</span>
            </>
          }
          description="Field notes, technical explainers, and deployment stories from the Metkaerox autonomous systems team."
        />
        <BlogSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <BlogPostCard key={post.id} post={post} />)
            ) : (
              <EmptyState
                title="No articles found"
                description="Try a different keyword or clear the search field."
              />
            )}
          </div>
          <BlogSidebar />
        </div>
      </Section>
    </SiteShell>
  );
}
