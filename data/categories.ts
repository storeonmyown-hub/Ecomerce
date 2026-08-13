export interface Category {
  name: string;
  slug: string;
  image: string;
  alt: string;
  position?: string;
}

export const categories: Category[] = [
  { name: "T-SHIRTS", slug: "t-shirts", image: "/images/lookbook-tee.webp", alt: "Camiseta negra oversized", position: "50% 45%" },
  { name: "HOODIES", slug: "hoodies", image: "/images/drop-flatlay.webp", alt: "Hoodie negro heavyweight", position: "18% 50%" },
  { name: "ACCESORIOS", slug: "accessories", image: "/images/drop-flatlay.webp", alt: "Gorra negra estructurada", position: "66% 20%" },
  { name: "BOLSOS", slug: "bags", image: "/images/drop-flatlay.webp", alt: "Bolso tote negro de lona", position: "82% 72%" },
];
