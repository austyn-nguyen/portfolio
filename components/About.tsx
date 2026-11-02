import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, Music2, Utensils } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="personal-about">
      <header className="about-heading">
        <p className="work-eyebrow">02 / The person behind the projects</p>
        <h2>A few things <span>that make me, me.</span></h2>
      </header>

      <div className="about-introduction">
        <div className="about-story">
          <p className="about-opening">I like figuring out how things work.<br /><span>Especially when people are part of the puzzle.</span></p>
          <p>I’m studying Computer Science at Michigan, with an M.S.E. in Industrial &amp; Operations Engineering up next. Product management brings together the things I enjoy most: understanding people, untangling tricky problems, and building something useful.</p>
          <p>That curiosity has taken me from banking experiences to hospital workflows to AI for economic policy. Different problems, same starting point: <strong>who are we trying to help, and what’s getting in their way?</strong></p>
          <a href="#experiences" className="about-story-link">A few places that curiosity has taken me <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <aside className="about-note" aria-label="A little about me">
          <span className="about-note-pin" aria-hidden="true">✳</span>
          <p className="about-note-heading">A little introduction</p>
          <ul>
            <li><span>Studying</span>Computer Science @ Michigan</li>
            <li><span>Up next</span>Operations Research</li>
            <li><span>Drawn to</span>Products with people at the center</li>
          </ul>
          <p className="about-note-signoff">Always a little curious.<span aria-hidden="true">☺</span></p>
        </aside>
      </div>

      <div className="about-offline-heading"><h3>And when the laptop closes…</h3><span aria-hidden="true">↘</span></div>
      <div className="about-postcards">
        <Link href="/music" className="about-postcard about-postcard-music">
          <div className="about-postcard-image"><Image src="/images/portraits/austyn-nguyen-music.png" alt="Austyn holding his viola on campus" fill sizes="(max-width: 767px) 90vw, 530px" /></div>
          <div className="about-postcard-copy"><p className="about-postcard-label"><Music2 size={16} aria-hidden="true" /> A different kind of keyboard break</p><h4>There’s usually a viola involved.<ArrowUpRight size={23} aria-hidden="true" /></h4><p>Principal violist with the Michigan Pops Orchestra, and always happy to talk repertoire.</p><span className="about-postcard-cta">Come hear a little more</span></div>
        </Link>
        <Link href="/travel" className="about-postcard about-postcard-travel">
          <div className="about-postcard-image"><Image src="/images/travel/travel-img-9023.jpg" alt="A bowl of pasta from Austyn’s food and travel photo collection" fill sizes="(max-width: 767px) 90vw, 530px" /></div>
          <div className="about-postcard-copy"><p className="about-postcard-label"><Utensils size={16} aria-hidden="true" /> A camera roll full of good food</p><h4>Or something good to eat.<ArrowUpRight size={23} aria-hidden="true" /></h4><p>Local bites, new places, and a growing collection of food adventures. Yes, there’s a map.</p><span className="about-postcard-cta">Follow the food trail</span></div>
        </Link>
      </div>
      <div className="about-gaming"><p><Gamepad2 size={22} aria-hidden="true" /><span>And sometimes, just one more game.</span></p><div><a href="https://op.gg/lol/summoners/na/Cubaaash-NA1" target="_blank" rel="noopener noreferrer">League of Legends <ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.roblox.com/user.aspx?username=GamerBoy321" target="_blank" rel="noopener noreferrer">Roblox <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    </section>
  );
}
