"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    fetch("/api/syncUser", { method: "POST" });
  }, [user]);

  return null;
}
