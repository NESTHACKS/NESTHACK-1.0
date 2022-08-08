const formatMoney = (amount) => {
  if (isNaN(amount)) amount = 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export { formatMoney };
