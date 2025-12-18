import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar page="portfolio" />
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
      </main>
    </>
  );
}
