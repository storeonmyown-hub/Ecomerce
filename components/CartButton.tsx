"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { itemCount, openCart } = useCart();
  return (
    <button className="icon-button cart-trigger" type="button" onClick={openCart}
      aria-label={`Abrir carrito, ${itemCount} ${itemCount === 1 ? "prenda" : "prendas"}`}>
      <ShoppingBag size={20} strokeWidth={1.4} aria-hidden="true" />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </button>
  );
}
