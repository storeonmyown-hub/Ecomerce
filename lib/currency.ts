const copFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
  useGrouping: true,
});

export function formatCop(value: number): string {
  return `${copFormatter.format(value)} COP`;
}
