import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

type SiteShellProps = {
  breadcrumbs?: boolean;
  children: ReactNode;
  footer?: boolean;
};

export default function SiteShell({
  breadcrumbs = true,
  children,
  footer = true,
}: SiteShellProps) {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <Navbar />
      {breadcrumbs ? <Breadcrumbs /> : null}
      {children}
      {footer ? <Footer /> : null}
    </main>
  );
}
