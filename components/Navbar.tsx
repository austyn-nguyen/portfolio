"use client";

import DecorativeMark from "./DecorativeMark";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  page: "portfolio" | "music" | "travel";
}

const sectionLinks = {
  portfolio: [
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experiences" },
    { name: "Education", id: "education" },
    { name: "Toolkit", id: "skills" },
    { name: "Updates", id: "roadmap" },
    { name: "Contact", id: "contact" },
  ],
  music: [
    { name: "Introduction", id: "hero" },
    { name: "Performances", id: "performances" },
    { name: "Listening lately", id: "listening" },
    { name: "My journey", id: "timeline" },
  ],
  travel: [
    { name: "Introduction", id: "hero" },
    { name: "Photo diary", id: "gallery" },
    { name: "Map", id: "map" },
  ],
};
const pages = [
  { name: "Portfolio", href: "/", id: "portfolio" },
  { name: "Music", href: "/music", id: "music" },
  { name: "Travel", href: "/travel", id: "travel" },
];

export default function Navbar({ page }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setIsOpen(false);
  const otherPages = pages.filter((item) => item.id !== page);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) setIsOpen(false);
    };
    const wideScreen = window.matchMedia("(min-width: 1280px)");
    const closeOnResize = () => { if (wideScreen.matches) setIsOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    wideScreen.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      wideScreen.removeEventListener("change", closeOnResize);
    };
  }, [isOpen]);

  return (
    <nav ref={nav} className="personal-nav" aria-label="Main navigation" onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
        menuButton.current?.focus();
      }
    }}>
      <div className="nav-bar">
        <Link href="/" className="nav-brand" onClick={closeMenu} aria-label="Austyn Nguyen home">austyn<span aria-hidden="true"><DecorativeMark /></span></Link>
        <div className="nav-desktop">
          {sectionLinks[page].map((link) => <a key={link.id} href={`#${link.id}`} className="nav-link">{link.name}</a>)}
          <span className="nav-divider" aria-hidden="true" />
          {otherPages.map((item) => <Link key={item.id} href={item.href} className="nav-link nav-world-link">{item.name}<ArrowUpRight className="link-arrow" size={13} aria-hidden="true" /></Link>)}
        </div>
        <div className="nav-actions">
          {page !== "portfolio" && <Link href="/#contact" className="nav-contact">Say hello <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></Link>}
          <ThemeToggle />
          <button ref={menuButton} className="nav-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className="nav-mobile" hidden={!isOpen}>
        {sectionLinks[page].map((link) => <a key={link.id} href={`#${link.id}`} onClick={closeMenu}>{link.name}</a>)}
        <div className="nav-mobile-worlds">
          {otherPages.map((item) => <Link key={item.id} href={item.href} onClick={closeMenu}>{item.name}<ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></Link>)}
        </div>
        {page !== "portfolio" && <Link href="/#contact" onClick={closeMenu}>Say hello <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></Link>}
      </div>
    </nav>
  );
}
