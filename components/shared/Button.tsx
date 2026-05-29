import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--accent),var(--highlight))] text-[var(--button-contrast)] shadow-[0_14px_30px_rgba(var(--accent-rgb),0.18)]",
  secondary:
    "border border-[var(--border)] bg-[var(--panel)] text-[var(--text)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--text-muted)] hover:text-[var(--text)]",
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-sm",
};

type BaseProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn-interaction inline-flex items-center justify-center gap-2 rounded-lg font-bold uppercase tracking-[0.14em] transition-colors duration-300",
    variantClassNames[variant],
    sizeClassNames[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
