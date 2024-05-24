import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import ClientProviders from "./providers";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Dialogue Creator",
  description: "Created by Chris Waitt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark">
          <ClientProviders>
            <Toaster />
            <div className='h-dvh w-full flex flex-col'>
              <Navbar />
              <div className='flex grow'>
                {children}
              </div>
            </div>
          </ClientProviders>
        </Theme>
      </body>
    </html>
  );
}
