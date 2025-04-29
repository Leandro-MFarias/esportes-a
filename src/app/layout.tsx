import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Esportes A",
    template: "%s - Esportes A"
  },
  description: "Come and read my articles!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased dark`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
