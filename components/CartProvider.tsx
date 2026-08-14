"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { CartDrawer } from "./CartDrawer";

export interface CartItem {
  readonly key: string;
  readonly productId: string;
  readonly productName: string;
  readonly slug: string;
  readonly image: string;
  readonly color: string;
  readonly size: string;
  readonly priceCop: number;
  readonly quantity: number;
}

type NewCartItem = Omit<CartItem, "key" | "quantity">;

interface CartContextValue {
  readonly items: readonly CartItem[];
  readonly itemCount: number;
  readonly totalCop: number;
  readonly isOpen: boolean;
  readonly addItem: (item: NewCartItem) => void;
  readonly updateQuantity: (key: string, quantity: number) => void;
  readonly removeItem: (key: string) => void;
  readonly openCart: () => void;
  readonly closeCart: () => void;
}

const STORAGE_KEY = "on-my-own-cart";
const STORAGE_VERSION = 1;
const CartContext = createContext<CartContextValue | null>(null);
const emptyCart: readonly CartItem[] = [];
let cartSnapshot: readonly CartItem[] = emptyCart;
let hasReadStorage = false;
const cartListeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return typeof item.key === "string" && typeof item.productId === "string" &&
    typeof item.productName === "string" && typeof item.slug === "string" &&
    typeof item.image === "string" && typeof item.color === "string" &&
    typeof item.size === "string" && typeof item.priceCop === "number" &&
    Number.isSafeInteger(item.quantity) && (item.quantity ?? 0) > 0;
}

function getCartSnapshot(): readonly CartItem[] {
  if (!hasReadStorage && typeof window !== "undefined") {
    hasReadStorage = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : null;
      if (
        parsed && typeof parsed === "object" &&
        (parsed as { version?: unknown }).version === STORAGE_VERSION &&
        Array.isArray((parsed as { items?: unknown }).items)
      ) {
        cartSnapshot = (parsed as { items: unknown[] }).items.filter(isCartItem);
      } else {
        cartSnapshot = emptyCart;
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      cartSnapshot = emptyCart;
    }
  }
  return cartSnapshot;
}

function subscribeToCart(listener: () => void): () => void {
  cartListeners.add(listener);
  return () => cartListeners.delete(listener);
}

function updateCart(updater: (current: readonly CartItem[]) => readonly CartItem[]) {
  cartSnapshot = updater(getCartSnapshot());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      items: cartSnapshot,
    }));
  } catch {
    // El carrito sigue funcionando durante la sesión si el navegador bloquea el almacenamiento.
  }
  cartListeners.forEach((listener) => listener());
}

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const items = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => emptyCart);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    totalCop: items.reduce((total, item) => total + item.priceCop * item.quantity, 0),
    isOpen,
    addItem: (item) => {
      const key = `${item.productId}:${item.color}:${item.size}`;
      updateCart((current) => {
        const existing = current.find((cartItem) => cartItem.key === key);
        return existing
          ? current.map((cartItem) => cartItem.key === key
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem)
          : [...current, { ...item, key, quantity: 1 }];
      });
      setIsOpen(true);
    },
    updateQuantity: (key, quantity) => {
      updateCart((current) => quantity < 1
        ? current.filter((item) => item.key !== key)
        : current.map((item) => item.key === key ? { ...item, quantity } : item));
    },
    removeItem: (key) => updateCart((current) => current.filter((item) => item.key !== key)),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [isOpen, items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
