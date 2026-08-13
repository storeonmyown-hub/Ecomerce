"use client";

import type { Product } from "@/data/products";
import Image from "next/image";
import { useId, useState } from "react";

interface ProductGalleryProps {
  readonly product: Product;
  readonly priority?: boolean;
}

export function ProductGallery({
  product,
  priority = false,
}: ProductGalleryProps) {
  const stageId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryImages = product.images.slice(0, 4);
  const selectedImage = galleryImages[selectedIndex] ?? galleryImages[0];

  if (!selectedImage) {
    return (
      <p className="product-gallery-empty" role="status">
        IMÁGENES NO DISPONIBLES
      </p>
    );
  }

  return (
    <section
      className="product-gallery"
      aria-label={`Galería de ${product.name}`}
    >
      <figure className="product-gallery-stage" id={stageId}>
        <Image
          className="product-gallery-image"
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          priority={priority && selectedIndex === 0}
          sizes="(max-width: 900px) 100vw, 58vw"
          style={{ objectFit: "contain" }}
        />
        <figcaption className="product-gallery-caption">
          {selectedIndex + 1} / 4
        </figcaption>
      </figure>

      <div className="product-gallery-thumbnails" aria-label="Elegir imagen">
        {galleryImages.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              className={`product-gallery-thumbnail${
                isSelected ? " product-gallery-thumbnail--selected" : ""
              }`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ver imagen ${index + 1} de 4: ${image.alt}`}
              aria-controls={stageId}
              aria-pressed={isSelected}
              key={image.src}
            >
              <Image
                className="product-gallery-thumbnail-image"
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 21vw, 9vw"
                style={{ objectFit: "contain" }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
