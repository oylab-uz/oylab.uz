import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontClassName } from "@/app/fonts";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ThemeInit } from "@/components/theme/theme-init";
import { env } from "@/lib/env";
import { getIdentity } from "@/lib/identity";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { default: "OY Lab admin", template: "%s · OY Lab admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { email } = await getIdentity();
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={fontClassName}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <ThemeInit />
        <div className="flex min-h-dvh flex-col overflow-x-clip lg:flex-row">
          <AdminSidebar email={email} canSignOut={Boolean(env.access())} />
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
