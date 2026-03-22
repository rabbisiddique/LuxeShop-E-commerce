import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import ClientProviders from "./ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "LuxeShop | Premium Shopping Experience",
  description:
    "Discover premium products with a luxurious shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ClientProviders>
          {children}
          <Toaster
            position="top-right"
            richColors
            expand={false}
            duration={3000}
            closeButton
            toastOptions={{
              style: {
                fontFamily: "var(--font-dm-sans)",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "14px 16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                border: "1px solid #E8E8E8",
                background: "#FFFFFF",
                color: "#1F1F1F",
              },
              classNames: {
                success: "toast-success",
                error: "toast-error",
                warning: "toast-warning",
                info: "toast-info",
              },
            }}
          />
        </ClientProviders>
      </body>
    </html>
  );
}
