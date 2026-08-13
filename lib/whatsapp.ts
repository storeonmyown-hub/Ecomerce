export interface WhatsAppOrderDetails {
  readonly productName: string;
  readonly color: string;
  readonly size: string;
  readonly priceCop: number | null;
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
