"use client";

import type { Product } from "@/data/products";
import { formatCop } from "@/lib/currency";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";

interface ProductPurchasePanelProps {
  readonly product: Product;
}

function formatPrice(priceCop: number | null): string {
  return priceCop === null ? "PRECIO POR CONFIRMAR" : formatCop(priceCop);
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [feedback, setFeedback] = useState("");
  const hasRequiredSelection = Boolean(selectedColor && selectedSize);
  const selectorsDisabled = !product.available;
  const orderDisabled = selectorsDisabled || !hasRequiredSelection;
  const disabledReason = selectorsDisabled
    ? "Este producto no está disponible para pedidos en este momento."
    : "Selecciona un color y una talla para continuar.";

  return (
    <aside
      className="product-purchase-panel"
      aria-labelledby="product-purchase-title"
    >
      <header className="product-purchase-header">
        <p className="product-purchase-drop">
          DROP {String(product.dropNumber).padStart(3, "0")}
        </p>
        <h1 className="product-purchase-title" id="product-purchase-title">
          {product.name}
        </h1>
        <p className="product-purchase-price">{formatPrice(product.priceCop)}</p>
        {!product.available && (
          <p className="product-purchase-availability" role="status">
            AGOTADO
          </p>
        )}
      </header>

      <p className="product-purchase-description">{product.description}</p>

      <ul className="product-purchase-details" aria-label="Características">
        {product.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>

      <form
        className="product-purchase-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (orderDisabled || product.priceCop === null) return;
          addItem({
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            image: product.feedImage.src,
            color: selectedColor,
            size: selectedSize,
            priceCop: product.priceCop,
          });
          setFeedback("Prenda agregada al carrito.");
        }}
      >
        <ColorSelector
          colors={product.colors}
          value={selectedColor}
          onChange={setSelectedColor}
          disabled={selectorsDisabled}
        />
        <SizeSelector
          sizes={product.sizes}
          value={selectedSize}
          onChange={setSelectedSize}
          disabled={selectorsDisabled}
        />
        <button
          className={`product-whatsapp-button${orderDisabled ? " product-whatsapp-button--disabled" : ""}`}
          type="submit"
          disabled={orderDisabled}
          aria-describedby="purchase-feedback"
        >
          <ShoppingBag size={19} strokeWidth={1.5} aria-hidden="true" />
          AGREGAR AL CARRITO
        </button>
        <p className="product-whatsapp-feedback" id="purchase-feedback" role="status" aria-live="polite">
          {feedback || (orderDisabled ? disabledReason : "Puedes agregar varias prendas antes de finalizar.")}
        </p>
      </form>

      <div className="product-information">
        <details>
          <summary>GUÍA DE TALLAS</summary>
          <p>Consulta la lámina 03 de la galería para ver las medidas de este drop.</p>
        </details>
        <details>
          <summary>ENVÍOS Y CAMBIOS</summary>
          <p>Información comercial pendiente de confirmar antes del lanzamiento.</p>
        </details>
      </div>
    </aside>
  );
}
