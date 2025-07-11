import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
};

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
