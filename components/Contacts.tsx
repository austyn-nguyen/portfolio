import DecorativeMark from "./DecorativeMark";
import { ArrowUpRight, Mail, Music2, Utensils, Lightbulb } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/austyn-an-nguyen/", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/austyn-nguyen", icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/austyn_an_nguyen/", icon: FaInstagram },
];

export default function Contact() {
  return (
    <section id="contact" className="personal-contact">
      <div className="contact-postcard">
        <div className="contact-message">
          <h2>Good things start<br />with a <span>hello.</span></h2>
          <p>Have something in mind? A product idea, a new opportunity, or a food spot I need to try—I’d love to hear about it.</p>
          <a href="mailto:austynan@umich.edu" className="contact-email"><Mail size={20} aria-hidden="true" /><span>austynan@umich.edu</span><ArrowUpRight className="link-arrow" size={20} aria-hidden="true" /></a>
          <div className="contact-socials">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"><social.icon size={18} aria-hidden="true" />{social.label}<ArrowUpRight className="link-arrow" size={13} aria-hidden="true" /></a>)}</div>
        </div>
        <aside className="contact-margin" aria-label="Conversation starters">
          <div className="contact-stamp" aria-hidden="true"><span>FROM ANN ARBOR</span><span className="contact-stamp-smile"><DecorativeMark kind="smile" /></span><span>WITH CURIOSITY</span></div>
          <p>Always happy to talk about…</p>
          <ul><li><Lightbulb size={18} aria-hidden="true" />Things worth building</li><li><Music2 size={18} aria-hidden="true" />Viola repertoire</li><li><Utensils size={18} aria-hidden="true" />The next good meal</li></ul>
          <span className="contact-signature">Talk soon, Austyn</span>
        </aside>
      </div>
    </section>
  );
}
