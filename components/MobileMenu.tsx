"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#new-drop" },
  { label: "About", href: "/#manifesto" },
  { label: "Contact", href: "/#footer" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="mobile-menu-wrap">
      <button className="icon-button mobile-trigger" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open}>
        <Menu size={22} strokeWidth={1.4} />
      </button>
      <div className={`mobile-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-panel-top">
          <span className="eyebrow">MENU / 001</span>
          <button className="icon-button" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X size={24} strokeWidth={1.3} />
          </button>
        </div>
        <nav aria-label="Navegación móvil">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
        </nav>
        <p>TRUST THE PROCESS</p>
      </div>
    </div>
  );
}
