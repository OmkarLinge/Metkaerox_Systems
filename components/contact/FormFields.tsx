import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const controlClassName =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-[18px] py-3.5 text-base font-semibold text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[color:rgba(var(--highlight-rgb),0.48)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)] disabled:cursor-not-allowed disabled:opacity-60";

type FieldShellProps = {
  children: ReactNode;
  htmlFor: string;
  label: string;
  required?: boolean;
};

function FieldShell({ children, htmlFor, label, required }: FieldShellProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-muted)]"
      >
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export function FormInput({
  className,
  id,
  label,
  name,
  required,
  style,
  ...props
}: FormInputProps) {
  const fieldId = id ?? name;

  return (
    <FieldShell htmlFor={fieldId} label={label} required={required}>
      <input
        id={fieldId}
        name={name}
        required={required}
        className={cn(controlClassName, className)}
        style={{ fontFamily: "var(--site-font)", ...style }}
        {...props}
      />
    </FieldShell>
  );
}

type SelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
};

export function FormSelect({
  className,
  id,
  label,
  name,
  options,
  placeholder,
  required,
  style,
  ...props
}: FormSelectProps) {
  const fieldId = id ?? name;

  return (
    <FieldShell htmlFor={fieldId} label={label} required={required}>
      <select
        id={fieldId}
        name={name}
        required={required}
        className={cn(controlClassName, "cursor-pointer appearance-none", className)}
        style={{ fontFamily: "var(--site-font)", ...style }}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export function FormTextarea({
  className,
  id,
  label,
  name,
  required,
  rows = 5,
  style,
  ...props
}: FormTextareaProps) {
  const fieldId = id ?? name;

  return (
    <FieldShell htmlFor={fieldId} label={label} required={required}>
      <textarea
        id={fieldId}
        name={name}
        required={required}
        rows={rows}
        className={cn(controlClassName, "min-h-[140px] resize-y", className)}
        style={{ fontFamily: "var(--site-font)", ...style }}
        {...props}
      />
    </FieldShell>
  );
}
