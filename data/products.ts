export const productCategories = [
  "t-shirts",
  "hoodies",
  "accessories",
  "bags",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export interface ProductImage {
  readonly src: string;
  readonly alt: string;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly dropNumber: number;
  readonly name: string;
  readonly category: ProductCategory;
  readonly priceCop: number | number;
  readonly description: string;
  readonly details: readonly string[];
  readonly colors: readonly string[];
  readonly sizes: readonly string[];
  readonly feedImage: ProductImage;
  readonly images: readonly ProductImage[];
  readonly available: boolean;
}

export const products = [
  {
    id: "drop-001",
    slug: "drop-001-different-minds",
    dropNumber: 1,
    name: "Different Minds",
    category: "t-shirts",
    priceCop: 90000,
    description:
      "Camiseta unisex de corte oversize en 100% algodón, con efecto acid wash y estampado en serigrafía.",
    details: [
      "100% algodón",
      "Corte oversize",
      "Efecto acid wash",
      "Estampado en serigrafía",
      "Unisex",
    ],
    // La primera etiqueta de color está cortada en la guía y debe confirmarse.
    colors: ["Tono claro (por confirmar)", "Negro", "Gris", "Azul claro", "Fucsia", "Lila"],
    sizes: ["S", "M", "L", "XL"],
    feedImage: {
      src: "/products/drop-001/feed.webp",
      alt: "Vista editorial del Drop 001 Different Minds con la camiseta acid wash de frente y espalda",
    },
    images: [
      {
        src: "/products/drop-001/01-models.webp",
        alt: "Modelos vistiendo la camiseta Different Minds de frente y espalda",
      },
      {
        src: "/products/drop-001/02-product.webp",
        alt: "Camiseta Different Minds aislada, vista frontal y posterior",
      },
      {
        src: "/products/drop-001/03-size-guide.webp",
        alt: "Guía de tallas, colores y especificaciones de la camiseta Different Minds",
      },
      {
        src: "/products/drop-001/04-details.webp",
        alt: "Detalles del estampado, costuras y acabados de la camiseta Different Minds",
      },
    ],
    available: true,
  },
  {
    id: "drop-002",
    slug: "drop-002-acid-wash-ov",
    dropNumber: 2,
    name: "Acid Wash OV",
    category: "t-shirts",
    priceCop: 90000,
    description:
      "Camisilla unisex sin mangas de corte oversize, confeccionada en algodón nacional de 220 g con efecto acid wash.",
    details: [
      "220 g de peso",
      "100% algodón nacional",
      "Corte oversize",
      "Efecto acid wash",
      "Sin mangas",
      "Unisex",
    ],
    colors: ["Café", "Azul navy", "Negro", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    feedImage: {
      src: "/products/drop-002/feed.webp",
      alt: "Vista editorial del Drop 002 Acid Wash OV con la camisilla de frente y espalda",
    },
    images: [
      {
        src: "/products/drop-002/01-models.webp",
        alt: "Modelo vistiendo la camisilla Acid Wash OV de frente y espalda",
      },
      {
        src: "/products/drop-002/02-product.webp",
        alt: "Camisilla Acid Wash OV aislada, vista frontal y posterior",
      },
      {
        src: "/products/drop-002/03-size-guide.webp",
        alt: "Guía de tallas, colores y especificaciones de la camisilla Acid Wash OV",
      },
      {
        src: "/products/drop-002/04-details.webp",
        alt: "Detalles del estampado, cuello y acabados de la camisilla Acid Wash OV",
      },
    ],
    available: true,
  },
  {
    id: "drop-003",
    slug: "drop-003-peruana-premium",
    dropNumber: 3,
    name: "Peruana Premium",
    category: "t-shirts",
    priceCop: 90000,
    description:
      "Camiseta oversize en algodón peruano de 310 g, con tejido reactivo siliconado, tratamiento antipilling y costuras reforzadas.",
    details: [
      "310 g de peso",
      "100% algodón peruano",
      "Corte oversize",
      "Antipilling",
      "Teñido reactivo y siliconado",
      "Costuras reforzadas",
      "Hecho en Perú",
    ],
    colors: ["Negro", "Azul navy", "Blanco", "Blanco hueso", "Beige"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    feedImage: {
      src: "/products/drop-003/feed.webp",
      alt: "Vista editorial del Drop 003 Peruana Premium con la camiseta blanca de frente y espalda",
    },
    images: [
      {
        src: "/products/drop-003/01-models.webp",
        alt: "Modelos vistiendo la camiseta Peruana Premium",
      },
      {
        src: "/products/drop-003/02-product.webp",
        alt: "Camiseta Peruana Premium aislada, vista frontal y posterior",
      },
      {
        src: "/products/drop-003/03-size-guide.webp",
        alt: "Guía de tallas, colores y especificaciones de la camiseta Peruana Premium",
      },
      {
        src: "/products/drop-003/04-details.webp",
        alt: "Detalles del estampado, cuello y acabados de la camiseta Peruana Premium",
      },
    ],
    available: true,
  },
  {
    id: "drop-004",
    slug: "drop-004-FALLEN",
    dropNumber: 4,
    name: "FALLEN",
    category: "t-shirts",
    priceCop: 90000,
    description:
      "Camiseta unisex de corte oversize en 100% algodón. Caer Tambien es parte del proceso, FALLEN representa esos momentos en los que el camino pesa, las certezas desaparecen y solo queda seguir por cuenta propia. Inspirado en la figura del ángel caído, este drop transforma la caída en símbolo de evolución, carácter y renacimiento.",
    details: [
      "100% algodón",
      "Corte oversize",
      "Elite Peruana",
      "Estampado en DTF",
      "Unisex",
    ],
    // La primera etiqueta de color está cortada en la guía y debe confirmarse.
    colors: ["Blanco ", "Negro", "Rosado", "Verde Olivo", "Chocolate", "Azul Alicia", "Rojo vivo", "Blanco Hueso", "Arena"],
    sizes: ["S", "M", "L", "XL"],
    feedImage: {
      src: "/products/drop-004/feed.webp",
      alt: "Vista editorial del Drop 004 FALLEN con la camiseta FALLEN de frente y espalda",
    },
    images: [
      {
        src: "/products/drop-004/01-models.webp",
        alt: "Modelos vistiendo la camiseta FALLEN de frente y espalda",
      },
      {
        src: "/products/drop-004/02-product.webp",
        alt: "Camiseta FALLEN aislada, vista frontal y posterior",
      },
      {
        src: "/products/drop-004/03-size-guide.webp",
        alt: "Guía de tallas, colores y especificaciones de la camiseta FALLEN",
      },
      {
        src: "/products/drop-004/04-details.webp",
        alt: "Detalles del estampado, costuras y acabados de la camiseta FALLEN",
      },
    ],
    available: true,
  },
  {
    id: "drop-005",
    slug: "drop-005-blind-peace",
    dropNumber: 5,
    name: "BLIND PEACE",
    category: "t-shirts",
    priceCop: 90000,
    description:
      "Camiseta unisex de corte oversize en 100% algodón.BLIND PEACE representa la decisión de apartar la mirada del ruido, el caos y todo aquello que intenta alterar tu camino.",
    details: [
      "100% algodón",
      "Corte oversize",
      "Elite Peruana",
      "Estampado en DTF",
      "Unisex",
    ],
    // La primera etiqueta de color está cortada en la guía y debe confirmarse.
    colors: ["Blanco ", "Azul Navy", "Negro", "Blanco Hueso", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    feedImage: {
      src: "/products/drop-005/feed.webp",
      alt: "Vista editorial del Drop 005 BLIND PEACE con la camiseta BLIND PEACE de frente y espalda",
    },
    images: [
      {
        src: "/products/drop-005/01-models.webp",
        alt: "Modelos vistiendo la camiseta BLIND PEACE de frente y espalda",
      },
      {
        src: "/products/drop-005/02-product.webp",
        alt: "Camiseta BLIND PEACE aislada, vista frontal y posterior",
      },
      {
        src: "/products/drop-005/03-size-guide.webp",
        alt: "Guía de tallas, colores y especificaciones de la camiseta BLIND PEACE",
      },
      {
        src: "/products/drop-005/04-details.webp",
        alt: "Detalles del estampado, costuras y acabados de la camiseta BLIND PEACE",
      },
    ],
    available: true,
  },
] as const satisfies readonly Product[];

export type ProductSlug = (typeof products)[number]["slug"];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: string): readonly Product[] {
  if (!category || category === "all") {
    return products;
  }

  if (!productCategories.some((item) => item === category)) {
    return [];
  }

  return products.filter((product) => product.category === category);
}
