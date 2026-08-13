import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  readonly products: readonly Product[];
  readonly emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "NO HAY PRODUCTOS DISPONIBLES EN ESTA CATEGORÍA.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="catalog-empty-state" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="catalog-product-grid" aria-label="Productos disponibles">
      {products.map((product, index) => (
        <ProductCard product={product} priority={index < 2} key={product.id} />
      ))}
    </div>
  );
}
