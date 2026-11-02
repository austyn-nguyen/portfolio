import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="personal-footer">
      <div className="footer-signoff"><a href="#hero" className="nav-brand" aria-label="Austyn Nguyen, back to top">austyn<span aria-hidden="true">✳</span></a><p>Built with curiosity. A little personality, too.</p></div>
      <nav aria-label="Footer navigation"><Link href="/music">Music</Link><Link href="/travel">Travel</Link><a href="#hero">Back to top <ArrowUp size={16} aria-hidden="true" /></a></nav>
      <p className="footer-credit">© {new Date().getFullYear()} Austyn Nguyen</p>
    </footer>
  );
}
