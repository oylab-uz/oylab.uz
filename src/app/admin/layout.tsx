import type { Metadata } from "next";
import type { ReactNode } from "react";
import { geist, geistMono } from "@/app/fonts";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Providers } from "@/components/providers";
import { ThemeInit } from "@/components/theme/theme-init";
import { getIdentity } from "./identity";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { default: "OY Lab admin", template: "%s · OY Lab admin" },
  robots: { index: false, follow: false },
};

/** Second root layout. Only reachable through the admin host rewrite in src/proxy.ts. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { email } = await getIdentity();
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <ThemeInit />
        <Providers>
          <div className="flex min-h-dvh flex-col lg:flex-row">
            <AdminSidebar email={email} />
            <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
