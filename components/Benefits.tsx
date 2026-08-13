import { Headphones, MessageCircle, RefreshCcw, Truck } from "lucide-react";

const benefits = [
  { label: "ENVÍOS A TODO COLOMBIA", Icon: Truck },
  { label: "COMPRA DIRECTA", Icon: MessageCircle },
  { label: "CAMBIOS Y DEVOLUCIONES", Icon: RefreshCcw },
  { label: "ATENCIÓN POR WHATSAPP", Icon: Headphones },
];

export function Benefits() {
  return (
    <aside className="benefits" aria-label="Beneficios de compra">
      {benefits.map(({ label, Icon }) => (
        <div key={label}><Icon size={27} strokeWidth={1.15} aria-hidden="true" /><span>{label}</span></div>
      ))}
    </aside>
  );
}
