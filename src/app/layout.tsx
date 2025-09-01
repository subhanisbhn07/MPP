
'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import AdminLayout from "./admin/layout";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Compare Phones",
//   description: "The best place to compare mobile phone specifications.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            {isAdminRoute ? (
              <AdminLayout>{children}</AdminLayout>
            ) : (
              <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 container px-4 md:px-6">{children}</main>
                  <Footer />
              </div>
            )}
        </Providers>
      </body>
    </html>
  );
}
