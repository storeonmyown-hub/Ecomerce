import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory, productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explora los drops disponibles de ON MY OWN.",
};

const filterLabels: Record<string, string> = {
  all: "ALL",
  "t-shirts": "T-SHIRTS",
  hoodies: "HOODIES",
  accessories: "ACCESSORIES",
  bags: "BAGS",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const category = rawCategory && productCategories.some((item) => item === rawCategory) ? rawCategory : "all";
  const filteredProducts = getProductsByCategory(category);

  return (
    <>
      <Navbar solid />
      <main className="catalog-page">
        <header className="catalog-header section-shell">
          <p className="eyebrow">ON MY OWN / CATALOG 2026</p>
          <div className="catalog-title-row">
            <h1>SHOP</h1>
            <span>{String(filteredProducts.length).padStart(2, "0")} DROPS</span>
          </div>
          <p className="catalog-intro">
            Prendas construidas para acompañar el proceso. Explora cada drop y conoce sus materiales, colores y acabados.
          </p>
          <nav className="catalog-filters" aria-label="Filtrar productos por categoría">
            {["all", ...productCategories].map((filter) => {
              const href = filter === "all" ? "/shop" : `/shop?category=${filter}`;
              return (
                <Link href={href} key={filter} className={category === filter ? "is-active" : ""} aria-current={category === filter ? "page" : undefined}>
                  {filterLabels[filter]}
                </Link>
              );
            })}
          </nav>
        </header>
        <section className="catalog-results section-shell" aria-live="polite">
          <ProductGrid products={filteredProducts} emptyMessage="AÚN NO HAY DROPS EN ESTA CATEGORÍA." />
        </section>
      </main>
      <Footer />
    </>
  );
}
