"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

const links = [
  ["SHOP", "/shop"],
  ["COLLECTIONS", "/#new-drop"],
  ["ABOUT", "/#manifesto"],
  ["CONTACT", "/#footer"],
];

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${solid ? "navbar--solid" : ""} ${scrolled ? "navbar--scrolled" : ""}`}>
      <BrandMark compact />
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link href="/shop" className="icon-button search-button" aria-label="Explorar catálogo">
          <Search size={20} strokeWidth={1.4} />
        </Link>
        <CartButton />
      </div>
      <MobileMenu />
    </header>
  );
}
