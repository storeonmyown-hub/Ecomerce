import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ON MY OWN — Trust the process", template: "%s | ON MY OWN" },
  description: "ON MY OWN. Streetwear independiente. Trust the process.",
  openGraph: {
    title: "ON MY OWN",
    description: "Streetwear independiente. Trust the process.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
