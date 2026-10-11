"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/token";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    // ask the backend, so an expired or fake token is rejected too
    apiFetch("/me")
      .then((res) => {
        if (res.ok) setReady(true);
        else router.replace("/login");
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking your session...
      </main>
    );
  }

  return <>{children}</>;
}