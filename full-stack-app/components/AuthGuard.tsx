"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/token";
import { ChatsProvider } from "@/components/chats-context";

// the token that was already checked, so opening another chat does not check it again
let verifiedToken: string | null = null;

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(() => {
    const token = getToken();
    return token !== null && token === verifiedToken;
  });

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    if (token === verifiedToken) return;

    // ask the backend, so an expired or fake token is rejected too
    apiFetch("/me")
      .then((res) => {
        if (res.ok) {
          verifiedToken = token;
          setReady(true);
        } else {
          router.replace("/login");
        }
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

  return <ChatsProvider>{children}</ChatsProvider>;
}