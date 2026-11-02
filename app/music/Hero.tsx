import Image from "next/image";
import { ArrowDown, Play } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="music-introduction" aria-labelledby="music-title">
      <div className="music-introduction-copy">
        <p className="music-location">University of Michigan · Ann Arbor</p>
        <h1 id="music-title">Austyn Nguyen.<br /><span>Viola.</span></h1>
        <p className="music-introduction-bio">Principal violist with the Michigan Pops Orchestra and substitute violist with the Adrian Symphony Orchestra.</p>
        <a href="#performances" className="music-listen-link"><span><Play size={18} aria-hidden="true" /></span>Watch performances<ArrowDown size={17} aria-hidden="true" /></a>
      </div>
      <figure className="music-portrait">
        <div className="music-portrait-image"><Image src="/images/portraits/austyn-nguyen-music.png" alt="Austyn holding his viola beneath the arches on the University of Michigan campus" fill priority sizes="(max-width: 767px) 90vw, 620px" /></div>
        <figcaption>Austyn Nguyen · Ann Arbor, Michigan</figcaption>
      </figure>
      <blockquote className="music-margin-note">
        <p>“In music you can find your own niche. You can do what you want to do. There is really no job description. You have to find your own way, and that’s fun.”</p>
        <cite>— Hilary Hahn</cite>
      </blockquote>
    </section>
  );
}
