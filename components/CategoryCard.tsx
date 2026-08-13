import type { Category } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="category-card" aria-label={`Ver ${category.name} en el catálogo`}>
      <Image src={category.image} alt={category.alt} fill sizes="(max-width: 640px) 88vw, (max-width: 1000px) 45vw, 24vw" style={{ objectPosition: category.position }} />
      <span className="category-overlay" />
      <span className="category-number" aria-hidden="true">{String(category.slug.length).padStart(2, "0")}</span>
      <strong id={category.slug}>{category.name}</strong>
      <ArrowUpRight size={22} strokeWidth={1.25} aria-hidden="true" />
    </Link>
  );
}
