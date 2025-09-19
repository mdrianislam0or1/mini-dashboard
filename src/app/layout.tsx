import { NetworkStatus } from '@/components/ network-status';
import { AuthProvider } from "@/components/auth-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mini Dashboard - Zettabyte Technology",
  description: "A modern dashboard built with Next.js 15, TypeScript, and Tailwind CSS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ErrorBoundary>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-auto p-6">{children}</main>
              </div>
            </div>
            <NetworkStatus />
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  )
}
