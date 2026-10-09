import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JourneyBuddy | Intelligent Assistant",
  description: "Your intelligent assistant for finding useful answers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
