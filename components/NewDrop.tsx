import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export function NewDrop() {
  return (
    <section className="new-drop section-shell" id="new-drop" aria-labelledby="drop-title">
      <div className="drop-copy">
        <p className="eyebrow">NEW DROP</p>
        <h2 id="drop-title">DROP <span>001</span></h2>
        <p>BUILD THE FUTURE</p>
        <Link className="outline-cta" href="/shop">SHOP NOW <ArrowRight size={17} strokeWidth={1.4} /></Link>
      </div>
      <div className="drop-gallery">
        {products.map((product) => (
          <Link className="drop-photo" href={`/product/${product.slug}`} key={product.id}>
            <Image src={product.feedImage.src} alt={product.feedImage.alt} fill sizes="(max-width: 700px) 65vw, 26vw" />
            <span className="drop-photo-shade" aria-hidden="true" />
            <span className="drop-photo-caption">DROP {String(product.dropNumber).padStart(3, "0")} / {product.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
