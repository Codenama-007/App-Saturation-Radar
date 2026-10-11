"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const theme = {
  page: "relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 bg-background text-foreground dot-grid",
  card: "card-surface w-full p-6 md:p-8",
  title: "text-2xl text-foreground text-center",
  subtitle: "mt-2 text-sm text-center text-muted-foreground",
  label: "mb-2 inline-block text-sm font-medium text-foreground",
  hint: "mt-1.5 text-xs text-muted-foreground",
  input:
    "w-full rounded-md border border-border bg-[var(--surface-2)] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30",
  button:
    "btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  error: "text-sm text-[var(--danger)]",
  footerText: "mt-6 text-sm text-center text-muted-foreground",
  link: "font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
};

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type Field = {
  id: keyof SignupData;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

// One entry per input, so adding or removing a field is a one-line change
const fields: Field[] = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
    autoComplete: "username",
    hint: "3-30 characters: letters, numbers and underscores",
    minLength: 3,
    maxLength: 30,
    pattern: "[A-Za-z0-9_]+",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    hint: "At least 8 characters",
    minLength: 8,
    maxLength: 72,
  },
];

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update the field that was typed in
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // { username, email, password }
      });
      const data = await res.json();

      if (!res.ok) {
        // 409 sends a string, 422 sends a list of field errors
        setError(typeof data.detail === "string" ? data.detail : "Please check your details");
        return;
      }

      router.push("/login");
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={theme.page}>
      <div className="w-full max-w-md">
        <div className={theme.card}>
          <h1 className={theme.title}>Create your account</h1>
          <p className={theme.subtitle}>
            Check how crowded your app idea&apos;s market is.
          </p>

          <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className={theme.label}>
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  minLength={f.minLength}
                  maxLength={f.maxLength}
                  pattern={f.pattern}
                  value={form[f.id]}
                  onChange={handleChange}
                  required
                  className={theme.input}
                />
                {f.hint && <p className={theme.hint}>{f.hint}</p>}
              </div>
            ))}

            {error && (
              <p role="alert" className={theme.error}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={theme.button}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className={theme.footerText}>
            Already have an account?
            <Link href="/login" className={`ml-1 ${theme.link}`}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}