export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-8"
    >
      {/* title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Austyn <span className="text-[var(--accent)]">Nguyen</span>
      </h1>

      {/* bio */}
      <h2 className="mt-4 text-lg md:text-xl font-medium text-gray-600">
        Computer Science student at the University of Michigan – Ann Arbor
      </h2>
      {/* updates */}
      <p className="mt-6 max-w-xl text-gray-500 font-normal">
        Currently working on a portfolio website to showcase my projects and
        skills.
      </p>
      {/* scrollable button */}
      <a
        href="#about"
        className="mt-10 inline-block rounded-full bg-black px-10 py-3 text-white font-semibold tracking-wide hover:scale-105 transition-all"
      >
        About Me
      </a>
    </section>
  );
}
