export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-8 text-center bg-[var(--foreground)]/5 backdrop-blur-md"
    >
      <h2 className="text-5xl font-bold mb-6">Let's Connect</h2>
      <p className="text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto">
        Whether you want to talk about viola repertoire or web development, I'm
        always open to new opportunities!
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="mailto:your@email.com"
          className="px-8 py-3 rounded-full bg-[var(--accent)] text-[var(--background)] font-bold hover:scale-105 transition-transform"
        >
          Email Me
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          className="px-8 py-3 rounded-full border border-[var(--accent)] text-[var(--foreground)] font-bold hover:bg-[var(--accent)]/10 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
