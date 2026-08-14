import type { Product } from "@/data/products";
import { formatCop } from "@/lib/currency";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  readonly product: Product;
  readonly priority?: boolean;
}

function formatPrice(priceCop: number | null): string {
  return priceCop === null ? "PRECIO POR CONFIRMAR" : formatCop(priceCop);
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const dropLabel = `DROP ${String(product.dropNumber).padStart(3, "0")}`;

  return (
    <article className="catalog-product-card">
      <Link
        className="catalog-product-link"
        href={`/product/${product.slug}`}
        aria-label={`${dropLabel}: ${product.name}. Ver producto`}
      >
        <div className="catalog-product-media">
          <Image
            className="catalog-product-image"
            src={product.feedImage.src}
            alt={product.feedImage.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          />
          {!product.available && (
            <span className="catalog-product-badge" aria-label="Producto agotado">
              AGOTADO
            </span>
          )}
        </div>

        <div className="catalog-product-copy">
          <p className="catalog-product-drop">{dropLabel}</p>
          <h2 className="catalog-product-name">{product.name}</h2>
          <p className="catalog-product-price">{formatPrice(product.priceCop)}</p>
          <span className="catalog-product-action" aria-hidden="true">
            VER PRODUCTO
            <ArrowUpRight size={18} strokeWidth={1.4} />
          </span>
        </div>
      </Link>
    </article>
  );
}
