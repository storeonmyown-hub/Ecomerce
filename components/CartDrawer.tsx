"use client";

import { buildCartWhatsAppUrl } from "@/lib/whatsapp";
import { formatCop } from "@/lib/currency";
import { MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, totalCop, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const orderUrl = buildCartWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    items.map((item) => ({ productName: item.productName, color: item.color,
      size: item.size, priceCop: item.priceCop, quantity: item.quantity })));

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeCart(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isOpen]);

  return (
    <div className={`cart-layer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={closeCart}
        tabIndex={isOpen ? 0 : -1} aria-label="Cerrar carrito" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-header">
          <div><p className="eyebrow">TU SELECCIÓN</p><h2 id="cart-title">CARRITO</h2></div>
          <button className="icon-button" type="button" onClick={closeCart}
            aria-label="Cerrar carrito" tabIndex={isOpen ? 0 : -1}>
            <X size={24} strokeWidth={1.3} aria-hidden="true" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>TU CARRITO ESTÁ VACÍO.</p>
            <Link href="/shop" onClick={closeCart} tabIndex={isOpen ? 0 : -1}>EXPLORAR COLECCIÓN</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.key}>
                  <Link className="cart-item-image" href={`/product/${item.slug}`}
                    onClick={closeCart} tabIndex={isOpen ? 0 : -1}>
                    <Image src={item.image} alt="" fill sizes="96px" />
                  </Link>
                  <div className="cart-item-info">
                    <Link href={`/product/${item.slug}`} onClick={closeCart}
                      tabIndex={isOpen ? 0 : -1}>{item.productName}</Link>
                    <p>{item.color} / TALLA {item.size}</p>
                    <p>{formatCop(item.priceCop)}</p>
                    <div className="cart-item-controls">
                      <div className="cart-quantity" aria-label={`Cantidad de ${item.productName}`}>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Restar una unidad" tabIndex={isOpen ? 0 : -1}><Minus size={13} /></button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Agregar una unidad" tabIndex={isOpen ? 0 : -1}><Plus size={13} /></button>
                      </div>
                      <button className="cart-remove" type="button" onClick={() => removeItem(item.key)}
                        aria-label={`Eliminar ${item.productName}`} tabIndex={isOpen ? 0 : -1}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="cart-footer">
              <div className="cart-total"><span>TOTAL</span><strong>{formatCop(totalCop)}</strong></div>
              {orderUrl ? (
                <a className="cart-checkout" href={orderUrl} target="_blank" rel="noopener noreferrer"
                  tabIndex={isOpen ? 0 : -1}><MessageCircle size={19} aria-hidden="true" /> FINALIZAR POR WHATSAPP</a>
              ) : <p className="cart-error">WhatsApp no está disponible en este momento.</p>}
              <p className="cart-note">Confirmaremos disponibilidad y envío antes del pago.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
