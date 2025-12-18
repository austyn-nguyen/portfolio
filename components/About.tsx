import Image from "next/image";
import { SiRiotgames, SiRoblox } from "react-icons/si";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-8"
    >
      {/* Headshot */}
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
        <Image
          src="/me.png"
          alt="Photo of Austyn Nguyen"
          fill
          className="rounded-full object-cover shadow-xl ring-4 ring-[var(--accent)]/30 transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      {/* Text */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          About Me
        </h2>

        <p className="mt-6 text-[var(--foreground)] text-lg leading-relaxed">
          Hi! I'm Austyn, a Computer Science student at the University of
          Michigan with a passion for strategizing, planning, and organizing
          impactful products. As an aspiring Product Manager, I thrive on
          bridging user needs with innovative solutions, turning complex
          challenges into streamlined experiences. When I'm not diving into
          product strategy or analyzing market trends, you'll find me
          strategizing in League of Legends or building worlds in Roblox.
        </p>

        <p className="mt-4 text-[var(--foreground)] text-lg leading-relaxed">
          I'm excited to pursue product management roles where I can leverage my
          analytical mindset and organizational skills to drive meaningful
          innovation. I also love playing the viola—dive into my{" "}
          <a
            href="/musical-journey"
            className="text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors underline"
          >
            Musical Journey
          </a>{" "}
          to hear more!
        </p>

        {/* Hobbies/Links */}
        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-4">When I'm not working...</h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://op.gg/lol/summoners/na/Cubaaash-NA1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
            >
              <SiRiotgames size={20} />
              League of Legends Profile
            </a>
            <a
              href="https://www.roblox.com/user.aspx?username=GamerBoy321"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
            >
              <SiRoblox size={20} />
              Roblox Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
