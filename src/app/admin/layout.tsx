import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "FIDGETCRAFT Admin",
  description: "FIDGETCRAFT store administration",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
