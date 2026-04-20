/** Product prices are stored as whole Kenyan shillings (KES). */
export function formatKes(amountShillings: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountShillings);
}
