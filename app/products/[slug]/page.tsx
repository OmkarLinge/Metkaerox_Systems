import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { getProductById, products } from "@/data/company";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ProductVisual({
  color,
  image,
  imagePosition,
  size = 280,
}: {
  color: string;
  image: string;
  imagePosition?: string;
  size?: number;
}) {
  return (
    <div
      className="relative rounded-3xl flex items-center justify-center overflow-hidden"
      style={{
        minHeight: size,
        background: `radial-gradient(circle at 50% 40%, ${color}18 0%, rgba(10,15,28,0.18) 58%, rgba(10,15,28,0.12) 100%)`,
        border: `1px solid ${color}33`,
        boxShadow: `0 30px 80px ${color}18`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${color}14 1px, transparent 1px),
            linear-gradient(90deg, ${color}14 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.65), transparent)",
        }}
      />

      <Image
        src={image}
        alt="Product visual"
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        style={{
          objectFit: "contain",
          objectPosition: imagePosition ?? "center center",
          padding: "24px",
          animation: "float 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(6,11,22,0.04) 0%, rgba(6,11,22,0.16) 100%)",
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return {
      title: "Product Not Found | Metkaerox Systems",
    };
  }

  return {
    title: `${product.name} | Metkaerox Systems`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Metkaerox Systems`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  const currentIndex = products.findIndex((item) => item.id === product.id);
  const nextProduct = products[(currentIndex + 1) % products.length];

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--surface-contrast)",
        color: "var(--text)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${product.color}10 1px, transparent 1px),
            linear-gradient(90deg, ${product.color}10 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <header
        className="sticky top-0 z-20"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "rgba(10,15,28,0.88)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 min-h-[72px] flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ color: "var(--text)" }}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                backgroundColor: `${product.color}12`,
                border: `1px solid ${product.color}33`,
                color: product.color,
              }}
            >
              <Zap size={18} />
            </span>
            <div className="leading-none">
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                }}
              >
                METKAEROX
              </div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.34em",
                  color: product.color,
                  marginTop: "4px",
                }}
              >
                SYSTEMS
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#products"
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                letterSpacing: "0.12em",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              BACK TO PRODUCTS
            </Link>
            <Link
              href="/#contact"
              className="px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "0.12em",
                background: `linear-gradient(135deg, ${product.color}, var(--highlight))`,
                color: "var(--button-contrast)",
              }}
            >
              REQUEST DEMO
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 50% 12%, ${product.color}18 0%, transparent 72%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 mb-8"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  color: product.color,
                }}
              >
                <ArrowLeft size={14} />
                RETURN TO FLEET
              </Link>

              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
                style={{
                  border: `1px solid ${product.color}40`,
                  backgroundColor: `${product.color}12`,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{product.icon}</span>
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    color: product.color,
                  }}
                >
                  {product.category.toUpperCase()}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(2.8rem, 7vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  marginBottom: "18px",
                }}
              >
                {product.name}
              </h1>

              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: product.color,
                  marginBottom: "18px",
                }}
              >
                {product.tagline}
              </p>

              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1.08rem",
                  lineHeight: 1.85,
                  color: "rgba(229,231,235,0.78)",
                  maxWidth: "680px",
                }}
              >
                {product.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {product.specs.slice(0, 3).map((spec) => (
                  <div
                    key={spec.label}
                    className="px-4 py-3 rounded-xl"
                    style={{
                      border: `1px solid ${product.color}22`,
                      backgroundColor: "rgba(17,24,39,0.72)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.16em",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      {spec.label.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: product.color,
                      }}
                    >
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProductVisual
              color={product.color}
              image={product.image}
              imagePosition={product.imagePosition}
              size={360}
            />
          </div>
        </div>
      </section>

      <section className="relative pb-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
          <div
            className="rounded-3xl p-6 lg:p-8"
            style={{
              backgroundColor: "rgba(17,24,39,0.84)",
              border: `1px solid ${product.color}24`,
            }}
          >
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: product.color,
              }}
            >
              <ShieldCheck size={16} />
              SPECIFICATIONS
            </div>

            <div className="space-y-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 rounded-2xl px-4 py-4"
                  style={{
                    backgroundColor: `${product.color}08`,
                    border: `1px solid ${product.color}18`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "1rem" }}>{spec.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      {spec.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      color: product.color,
                    }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            <div
              className="rounded-3xl p-6 lg:p-8"
              style={{
                backgroundColor: "rgba(17,24,39,0.84)",
                border: `1px solid ${product.color}24`,
              }}
            >
              <div
                className="mb-6"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: product.color,
                }}
              >
                KEY FEATURES
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl px-4 py-4"
                    style={{
                      border: `1px solid ${product.color}18`,
                      backgroundColor: `${product.color}08`,
                    }}
                  >
                    <ChevronRight size={16} style={{ color: product.color, flexShrink: 0, marginTop: "2px" }} />
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "0.98rem",
                        lineHeight: 1.55,
                        color: "var(--text)",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl p-6 lg:p-8"
              style={{
                backgroundColor: "rgba(17,24,39,0.84)",
                border: `1px solid ${product.color}24`,
              }}
            >
              <div
                className="mb-6"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: product.color,
                }}
              >
                MISSION APPLICATIONS
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {product.applications.map((application) => (
                  <div
                    key={application}
                    className="rounded-2xl px-4 py-4"
                    style={{
                      border: `1px solid ${product.color}26`,
                      backgroundColor: `${product.color}10`,
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {application}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div
          className="max-w-7xl mx-auto mx-4 sm:mx-6 lg:mx-8 rounded-[32px] p-8 lg:p-10"
          style={{
            background: `linear-gradient(135deg, ${product.color}16, rgba(17,24,39,0.88))`,
            border: `1px solid ${product.color}28`,
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  color: product.color,
                  marginBottom: "12px",
                }}
              >
                NEXT PLATFORM
              </p>
              <h2
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  marginBottom: "10px",
                }}
              >
                Explore {nextProduct.name}
              </h2>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(229,231,235,0.72)",
                  maxWidth: "620px",
                }}
              >
                Continue through the Metkaerox Systems fleet or jump back to the main catalog to compare all eight platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/products/${nextProduct.id}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  background: `linear-gradient(135deg, ${product.color}, var(--highlight))`,
                  color: "var(--button-contrast)",
                }}
              >
                NEXT PRODUCT
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-300"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  border: `1px solid ${product.color}44`,
                  color: product.color,
                }}
              >
                ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );
}
