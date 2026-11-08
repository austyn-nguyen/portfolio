import "./globals.css";
import localFont from "next/font/local";
import SpaceBackground from "@/components/SpaceBackground";
import LightBackground from "@/components/LightBackground";
import ScrollRestoration from "@/components/ScrollRestoration";

const sourGummy = localFont({
  src: "./fonts/sour-gummy.ttf",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={sourGummy.className}
      suppressHydrationWarning={true}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `try { document.documentElement.classList.add(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'); } catch { document.documentElement.classList.add('light'); }`,
          }}
        />
        <ScrollRestoration />
        <LightBackground />
        <SpaceBackground />
        {children}
      </body>
    </html>
  );
}
