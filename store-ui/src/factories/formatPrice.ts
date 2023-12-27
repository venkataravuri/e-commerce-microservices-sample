const createPriceFormatter = (): ((priceStr: string) => string) => {
  const formatter = new Intl.NumberFormat("en-US");

  return (priceStr: string): string => {
    const price = Number(priceStr);
    return formatter.format(price);
  };
};

export const formatPrice = createPriceFormatter();

//console.log(formatPrice("1234567")); // Outputs: "1,234,567"
