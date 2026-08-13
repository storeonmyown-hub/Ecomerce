"use client";

import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { useId } from "react";

interface WhatsAppButtonProps {
  readonly productName: string;
  readonly color: string;
  readonly size: string;
  readonly priceCop: number | null;
  readonly disabled?: boolean;
  readonly disabledReason?: string;
}

export function WhatsAppButton({
  productName,
  color,
  size,
  priceCop,
  disabled = false,
  disabledReason,
}: WhatsAppButtonProps) {
  const feedbackId = useId();
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const hasValidPhoneNumber = normalizeWhatsAppNumber(phoneNumber) !== null;
  const orderUrl = buildWhatsAppUrl(phoneNumber, {
    productName,
    color,
    size,
    priceCop,
  });
  const isEnabled = !disabled && orderUrl !== null;
  const feedback = !hasValidPhoneNumber
    ? "WhatsApp no está disponible en este momento. Intenta de nuevo más tarde."
    : disabled
      ? (disabledReason ?? "Selecciona un color y una talla para continuar.")
      : orderUrl === null
        ? "No fue posible preparar el pedido. Revisa la selección e intenta de nuevo."
        : null;
  const buttonContent = (
    <>
      <MessageCircle size={19} strokeWidth={1.5} aria-hidden="true" />
      PEDIR POR WHATSAPP
    </>
  );

  return (
    <div className="product-whatsapp">
      {isEnabled ? (
        <a
          className="product-whatsapp-button"
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pedir ${productName} por WhatsApp`}
        >
          {buttonContent}
        </a>
      ) : (
        <button
          className="product-whatsapp-button product-whatsapp-button--disabled"
          type="button"
          disabled
          aria-describedby={feedback ? feedbackId : undefined}
        >
          {buttonContent}
        </button>
      )}

      {feedback && (
        <p
          className="product-whatsapp-feedback"
          id={feedbackId}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
