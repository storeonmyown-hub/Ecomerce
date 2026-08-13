import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { getProductBySlug, products } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <Navbar solid />
      <main className="product-page">
        <div className="product-breadcrumb section-shell">
          <Link href="/shop"><ArrowLeft size={14} aria-hidden="true" /> BACK TO SHOP</Link>
          <span>DROP {String(product.dropNumber).padStart(3, "0")}</span>
        </div>
        <section className="product-layout section-shell" aria-labelledby="product-title">
          <ProductGallery product={product} priority />
          <ProductPurchasePanel product={product} />
        </section>
        <section className="related-products section-shell" aria-labelledby="related-title">
          <div className="related-heading">
            <p className="eyebrow">KEEP EXPLORING</p>
            <h2 id="related-title">OTROS DROPS</h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      </main>
      <Footer />
    </>
  );
}
