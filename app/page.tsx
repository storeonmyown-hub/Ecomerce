import { Benefits } from "@/components/Benefits";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { NewDrop } from "@/components/NewDrop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewDrop />
        <Benefits />
        <Categories />
      </main>
      <Footer />
    </>
  );
}
