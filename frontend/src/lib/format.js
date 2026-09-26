// "₹12,500" for numeric prices; falls back to the raw value for anything else.
export const formatPrice = (price) => {
  const n = Number(price);
  return Number.isFinite(n) ? `₹${n.toLocaleString("en-IN")}` : `₹${price}`;
};
