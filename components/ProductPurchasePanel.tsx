"use client";

import type { Product } from "@/data/products";
import { useState } from "react";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { WhatsAppButton } from "./WhatsAppButton";

interface ProductPurchasePanelProps {
  readonly product: Product;
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function formatPrice(priceCop: number | null): string {
  return priceCop === null ? "PRECIO POR CONFIRMAR" : copFormatter.format(priceCop);
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
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
        onSubmit={(event) => event.preventDefault()}
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
        <WhatsAppButton
          productName={product.name}
          color={selectedColor}
          size={selectedSize}
          priceCop={product.priceCop}
          disabled={orderDisabled}
          disabledReason={disabledReason}
        />
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
