import DecorativeMark from "./DecorativeMark";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const pages = [
  { name: "Portfolio", href: "/", id: "portfolio" },
  { name: "Music", href: "/music", id: "music" },
  { name: "Travel", href: "/travel", id: "travel" },
];

export default function Footer({ page = "portfolio" }: { page?: "portfolio" | "music" | "travel" }) {
  return (
    <footer className="personal-footer">
      <div className="footer-signoff"><a href="#hero" className="nav-brand" aria-label="Austyn Nguyen, back to top">austyn<span aria-hidden="true"><DecorativeMark /></span></a><p>Built with curiosity. A little personality, too.</p></div>
      <nav aria-label="Footer navigation">{pages.filter((item) => item.id !== page).map((item) => <Link key={item.id} href={item.href}>{item.name}</Link>)}<a href="#hero">Back to top <ArrowUp size={16} aria-hidden="true" /></a></nav>
      <p className="footer-credit">© {new Date().getFullYear()} Austyn Nguyen</p>
    </footer>
  );
}
