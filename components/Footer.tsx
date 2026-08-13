import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";

const socialLinks = [
  { label: "INSTAGRAM", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "TIKTOK", href: process.env.NEXT_PUBLIC_TIKTOK_URL },
  { label: "WHATSAPP", href: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : undefined },
];

export function Footer() {
  return (
    <footer id="footer">
      <div className="footer-manifesto" id="manifesto">
        <span className="eyebrow">EST. / COLOMBIA</span>
        <BrandMark />
        <p>NO TEAM. NO HELP. NO EXCUSES.<br />JUST ME.</p>
        <span className="footer-star" aria-hidden="true">✦</span>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ON MY OWN. TODOS LOS DERECHOS RESERVADOS.</p>
        <nav aria-label="Redes sociales">
          {socialLinks.map((item) => item.href ? (
            <Link key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={12} /></Link>
          ) : <span key={item.label} aria-disabled="true" title="Enlace pendiente de configurar">{item.label}</span>)}
        </nav>
      </div>
    </footer>
  );
}
