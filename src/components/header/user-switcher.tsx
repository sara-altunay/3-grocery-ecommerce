"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PRESETS = [
  { label: "saraaltunay", value: "saraaltunay" },
  { label: "furkanevin", value: "furkanevin" },
  { label: "guest", value: "guest" },
];

export default function UserSwitcher() {
  const router = useRouter();
  const [value, setValue] = useState<string>("saraaltunay");

  useEffect(() => {
    const cookieId = typeof document !== "undefined"
      ? document.cookie
          .split(";")
          .map((s) => s.trim())
          .find((s) => s.startsWith("userId="))
          ?.split("=")[1]
      : undefined;
    const localId = typeof window !== "undefined" ? localStorage.getItem("userId") || undefined : undefined;
    const initial = localId || cookieId || process.env.NEXT_PUBLIC_USER_ID || "saraaltunay";
    setValue(initial);

    // If no user was set yet, preset to saraaltunay and sync everywhere
    if (!localId && !cookieId) {
      try {
        localStorage.setItem("userId", initial);
        document.cookie = `userId=${initial}; path=/`;
        window.dispatchEvent(new Event("cart:updated"));
        router.refresh();
      } catch {}
    }
  }, []);

  const apply = (uid: string) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", uid);
        document.cookie = `userId=${uid}; path=/`;
        // Inform any listeners (e.g., CartBadge)
        window.dispatchEvent(new Event("cart:updated"));
      }
      // Refresh server-rendered areas (Header/cart page)
      router.refresh();
    } catch {}
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="user-switcher" className="text-sm text-gray-600">User:</label>
      <select
        id="user-switcher"
        className="border rounded px-2 py-1 text-sm"
        value={value}
        onChange={(e) => {
          const uid = e.target.value;
          setValue(uid);
          apply(uid);
        }}
      >
        {PRESETS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
