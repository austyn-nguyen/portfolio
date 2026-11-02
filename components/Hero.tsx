import DecorativeMark from "./DecorativeMark";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, MapPin, Music2, Sparkles, Utensils } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="personal-hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1>Hi, I’m<br /><span className="hero-name">Austyn<span className="hero-period">.</span></span></h1>
          <p className="hero-intro">A technical mind.<br />A <span className="hero-highlight">people-first</span> heart.</p>
          <p className="hero-description">I study Computer Science at Michigan and bring a love of building, problem-solving, and understanding people to product management.</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-button hero-button-primary">Explore my work <ArrowUpRight className="link-arrow" size={20} aria-hidden="true" /></a>
            <a href="/Austyn_Nguyen_Resume.pdf" download className="hero-button hero-button-secondary">My résumé <Download className="download-icon" size={17} aria-hidden="true" /></a>
          </div>
          <p className="hero-location"><MapPin size={15} aria-hidden="true" /> Ann Arbor, MI <span aria-hidden="true">·</span> Go Blue!</p>
        </div>

        <div className="hero-portrait-area">
          <span className="portrait-spark portrait-spark-one" aria-hidden="true"><DecorativeMark /></span>
          <span className="portrait-spark portrait-spark-two" aria-hidden="true"><DecorativeMark kind="sparkle" /></span>
          <figure className="hero-photo">
            <span className="photo-tape" aria-hidden="true" />
            <div className="hero-photo-image">
              <Image src="/images/portraits/austyn-nguyen-campus.png" alt="Austyn Nguyen smiling on the University of Michigan campus" fill priority sizes="(max-width: 767px) 80vw, 400px" />
            </div>
            <figcaption>Equal parts curious &amp; creative. <span aria-hidden="true"><DecorativeMark kind="smile" /></span></figcaption>
          </figure>
          <span className="portrait-sticker"><Sparkles size={17} aria-hidden="true" /> Always exploring</span>
        </div>
      </div>

      <div className="hero-footer">
        <a href="#about" className="hero-scroll"><span className="scroll-circle"><ArrowDown size={18} aria-hidden="true" /></span> A little more about me</a>
        <div className="hero-side-quests">
          <span className="side-quests-label">Away from the keyboard</span>
          <Link href="/music"><Music2 size={16} aria-hidden="true" /> Viola <ArrowUpRight className="link-arrow" size={14} aria-hidden="true" /></Link>
          <Link href="/travel"><Utensils size={16} aria-hidden="true" /> Food &amp; adventures <ArrowUpRight className="link-arrow" size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
