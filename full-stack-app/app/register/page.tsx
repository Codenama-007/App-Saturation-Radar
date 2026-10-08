"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const theme = {
  page: "relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 bg-background text-foreground dot-grid",
  card: "card-surface w-full p-6 md:p-8",
  title: "text-2xl text-foreground text-center",
  subtitle: "mt-2 text-sm text-center text-muted-foreground",
  label: "mb-2 inline-block text-sm font-medium text-foreground",
  input:
    "w-full rounded-md border border-border bg-[var(--surface-2)] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30",
  button:
    "btn-primary w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
};

// One entry per input, so adding or removing a field is a one-line change
const fields: Field[] = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
    autoComplete: "username",
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
  },
];

export default function Page() {
  const [form, setForm] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  // Update the field that was typed in
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // { username, email, password }
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Signup failed:", res.status, data); // a 422 lists the bad field in data.detail
        return;
      }
      console.log("Signup success:", data);
    } catch (err) {
      console.error("Network error:", err);
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
                  value={form[f.id]}
                  onChange={handleChange}
                  required
                  className={theme.input}
                />
              </div>
            ))}

            <button type="submit" className={theme.button}>
              Create account
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