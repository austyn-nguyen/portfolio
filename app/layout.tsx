import "./globals.css";
import { Sour_Gummy } from "next/font/google";
import SpaceBackground from "@/components/SpaceBackground";
import LightBackground from "@/components/LightBackground";
import ScrollRestoration from "@/components/ScrollRestoration";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add(localStorage.getItem('theme') || 'light');`,
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
