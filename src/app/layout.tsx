import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CulqiListener from "@/components/CulqiListener";
import WhatsappButton from "@/components/WhatsappButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script src="https://checkout.culqi.com/js/v4"></script>
      </head>
      <body>
        <CulqiListener />
        {children}
        <WhatsappButton /> {/* El botón aparecerá en todas las páginas */}
      </body>
    </html>
  );
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Moss",
  description: "Tienda creada con Next.js y Culqi",
};
