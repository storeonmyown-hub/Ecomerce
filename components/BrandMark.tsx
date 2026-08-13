import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="ON MY OWN, inicio">
      <span className="brand-spark" aria-hidden="true">✦</span>
      <span className={compact ? "brand-name brand-name--compact" : "brand-name"}>ON MY OWN</span>
      <span className="brand-spark" aria-hidden="true">✦</span>
    </Link>
  );
}
