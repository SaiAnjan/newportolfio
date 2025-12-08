import type { Metadata } from "next";
import { Merriweather, Space_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sai Anjan - UX Designer",
  description: "Product Designer with over 5 years of experience in UX research and interaction design",
};

const merriweather = Merriweather({
  variable: "--font-merriweather",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${merriweather.variable} ${spaceMono.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
