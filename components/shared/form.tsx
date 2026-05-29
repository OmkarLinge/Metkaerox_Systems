import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = {
  children: ReactNode;
  hint?: string;
  label: string;
  required?: boolean;
};

export function FormField({ children, hint, label, required }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {hint ? <span className="mt-2 block text-xs leading-5 text-[var(--text-muted)]">{hint}</span> : null}
    </label>
  );
}

const controlClassName =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm font-semibold text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[color:rgba(var(--highlight-rgb),0.5)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.10)] disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClassName, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClassName, "min-h-36 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClassName, "cursor-pointer", className)} {...props} />;
}

type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
  description?: string;
};

export function FileUpload({ className, description, ...props }: FileUploadProps) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--panel-muted)] p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(var(--accent-rgb),0.10)] text-[var(--accent)]">
          <UploadCloud size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <input
            type="file"
            className={cn(
              "block w-full cursor-pointer text-sm text-[var(--text-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:tracking-[0.12em] file:text-[var(--button-contrast)]",
              className
            )}
            {...props}
          />
          {description ? <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}
