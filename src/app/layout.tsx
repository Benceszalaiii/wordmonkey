import { ThemeSwitchCommand } from "@/components/themeswitcher";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WordMonkey",
  description: "A simple typing game",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⌨️</text></svg>"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          enableSystem={false}
          defaultTheme="tokyo"
          themes={["dark", "vscode", "tokyo"]}
        >
          <ThemeSwitchCommand />
          {children}
          <footer className="fixed flex flex-row gap-8 text-gray-500 bottom-0 w-full justify-center">
            <p>⌘K to switch themes</p>
            <p>TAB to reset</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
