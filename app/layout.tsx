import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sai Anjan - UX Designer",
  description:
    "Product Designer with over 5 years of experience in UX research and interaction design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed right-3 top-[max(env(safe-area-inset-top),0.75rem)] z-[90] sm:top-4 sm:right-4">
            <ThemeSwitcher />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
