import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const fontPrimary = Manrope({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GigaSend",
  description:
    "GigaSend lets you send and share large files up to 50GB quickly and securely. Share via email, direct link, or social platforms with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPrimary.variable}`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}