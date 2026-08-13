import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export function Categories() {
  return (
    <section className="categories section-shell" id="categories" aria-labelledby="categories-title">
      <div className="section-heading">
        <div><p className="eyebrow">SHOP BY CATEGORY</p><h2 id="categories-title">CATEGORÍAS</h2></div>
        <span aria-hidden="true">VER TODO <ArrowRight size={17} /></span>
      </div>
      <div className="category-grid">
        {categories.map((category) => <CategoryCard category={category} key={category.slug} />)}
      </div>
    </section>
  );
}
