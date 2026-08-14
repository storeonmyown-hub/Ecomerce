export interface WhatsAppOrderDetails {
  readonly productName: string;
  readonly color: string;
  readonly size: string;
  readonly priceCop: number | null;
}

export interface WhatsAppCartItem extends WhatsAppOrderDetails {
  readonly quantity: number;
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
  useGrouping: true,
});

function normalizeRequiredText(value: string): string | null {
  const normalized = value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
  return normalized.length > 0 ? normalized : null;
}

function formatPriceForMessage(priceCop: number | null): string {
  if (priceCop === null || !Number.isSafeInteger(priceCop) || priceCop < 0) {
    return "Por confirmar";
  }

  return `${copFormatter.format(priceCop)} COP`;
}

export function normalizeWhatsAppNumber(
  phoneNumber: string | null | undefined,
): string | null {
  if (!phoneNumber) {
    return null;
  }

  const normalized = phoneNumber.trim().replace(/[\s()+.-]/g, "");

  // wa.me requiere un número internacional sin “+” ni separadores.
  return /^[1-9]\d{6,14}$/.test(normalized) ? normalized : null;
}

export function buildWhatsAppMessage(
  order: WhatsAppOrderDetails,
): string | null {
  const productName = normalizeRequiredText(order.productName);
  const color = normalizeRequiredText(order.color);
  const size = normalizeRequiredText(order.size);

  if (!productName || !color || !size) {
    return null;
  }

  return [
    "Hola 👋",
    "",
    "Quiero realizar un pedido de ON MY OWN.",
    "",
    `Producto: ${productName}`,
    `Color: ${color}`,
    `Talla: ${size}`,
    `Precio: ${formatPriceForMessage(order.priceCop)}`,
    "",
    "¿Está disponible?",
  ].join("\n");
}

export function buildWhatsAppUrl(
  phoneNumber: string | null | undefined,
  order: WhatsAppOrderDetails,
): string | null {
  const normalizedNumber = normalizeWhatsAppNumber(phoneNumber);
  const message = buildWhatsAppMessage(order);

  if (!normalizedNumber || !message) {
    return null;
  }

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppMessage(
  items: readonly WhatsAppCartItem[],
): string | null {
  if (items.length === 0) return null;

  const normalizedItems = items.map((item) => ({
    ...item,
    productName: normalizeRequiredText(item.productName),
    color: normalizeRequiredText(item.color),
    size: normalizeRequiredText(item.size),
  }));

  if (normalizedItems.some((item) =>
    !item.productName || !item.color || !item.size ||
    !Number.isSafeInteger(item.quantity) || item.quantity < 1,
  )) return null;

  const lines = normalizedItems.flatMap((item, index) => [
    `${index + 1}. ${item.productName}`,
    `   Color: ${item.color} | Talla: ${item.size}`,
    `   Cantidad: ${item.quantity} | Precio unitario: ${formatPriceForMessage(item.priceCop)}`,
  ]);
  const total = normalizedItems.reduce(
    (sum, item) => sum + (item.priceCop ?? 0) * item.quantity,
    0,
  );

  return [
    "Hola 👋", "", "Quiero realizar este pedido de ON MY OWN:", "",
    ...lines, "", `Total: ${formatPriceForMessage(total)}`, "", "¿Está disponible?",
  ].join("\n");
}

export function buildCartWhatsAppUrl(
  phoneNumber: string | null | undefined,
  items: readonly WhatsAppCartItem[],
): string | null {
  const normalizedNumber = normalizeWhatsAppNumber(phoneNumber);
  const message = buildCartWhatsAppMessage(items);
  if (!normalizedNumber || !message) return null;
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
