import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image src="/images/hero-campaign.webp" alt="Dos modelos con prendas negras de estilo streetwear frente a una pared de concreto" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-count" aria-hidden="true"><span>01</span><i /><span>05</span></div>
      <div className="hero-content reveal-in">
        <p className="eyebrow">INDEPENDENT STREETWEAR / 2026</p>
        <h1 id="hero-title"><span aria-hidden="true">✦</span> ON MY OWN <span aria-hidden="true">✦</span></h1>
        <p className="hero-slogan">TRUST THE PROCESS</p>
        <Link className="outline-cta" href="/shop">EXPLORE COLLECTION <ArrowRight size={17} strokeWidth={1.4} /></Link>
      </div>
      <Link className="scroll-cue" href="#new-drop" aria-label="Ir a la nueva colección"><span>SCROLL</span><ArrowDown size={15} /></Link>
    </section>
  );
}
