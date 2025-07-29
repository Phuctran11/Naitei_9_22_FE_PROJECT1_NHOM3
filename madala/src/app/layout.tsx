import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/Auth/AuthProvider";
import ToastProvider from "@/app/products/components/ToastProvider";
import CompareProvider from "@/contexts/CompareContext";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CompareProvider>
            <ToastProvider />
            {children}
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
