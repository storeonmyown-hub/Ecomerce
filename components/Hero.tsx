import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image src="/images/hero-campaign.webp" alt="Dos modelos con prendas negras de estilo streetwear frente a una pared de concreto" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content reveal-in">
        <p className="eyebrow">INDEPENDENT STREETWEAR / 2026</p>
        <h1 id="hero-title"><span aria-hidden="true">✦</span> ON MY OWN <span aria-hidden="true">✦</span></h1>
        <p className="hero-slogan">TRUST THE PROCESS</p>
      </div>
    </section>
  );
}
