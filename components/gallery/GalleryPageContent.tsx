"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { imageGallery, videoGallery } from "@/data/gallery";
import SiteShell from "@/components/layout/SiteShell";
import Card from "@/components/shared/Card";
import Section from "@/components/shared/Section";

export default function GalleryPageContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <SiteShell>
      <Section className="pt-12">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
            Gallery
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
            Field visuals and flight stories.
          </h1>
          <p className="mx-auto mt-5 text-lg leading-8 text-[var(--text-muted)]">
            Capturing the precision, payload capability, and field performance
            of Metkaerox unmanned aerial systems.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
              Images
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase text-[var(--text)] sm:text-3xl">
              Product Gallery
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {imageGallery.map((item) => (
            <Card key={item.id} className="group overflow-hidden bg-[var(--card-bg)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/70">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-black uppercase">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
            Videos
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase text-[var(--text)] sm:text-3xl">
            Demonstration Reels
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {videoGallery.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-[var(--card-bg)]">
              <button
                type="button"
                className="group relative block aspect-video w-full overflow-hidden text-left"
                onClick={() => setActiveVideo(item.videoUrl)}
                aria-label={`Play ${item.title}`}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/34">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--button-contrast)] shadow-[0_0_28px_rgba(var(--accent-rgb),0.34)]">
                    <Play size={26} fill="currentColor" />
                  </span>
                </span>
              </button>
              <div className="p-5">
                <h3 className="text-xl font-black uppercase text-[var(--text)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {activeVideo ? (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            className="absolute right-5 top-5 text-white transition-colors hover:text-[var(--accent)]"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={activeVideo}
              title="Metkaerox video"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </SiteShell>
  );
}
