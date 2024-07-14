export const getTodayDate = () => {
  return new Date();
};

export const addDaysToDate = (days: number, date?: Date) => {
  const thisDate = date || getTodayDate();
  thisDate.setDate(thisDate.getDate() + days);

  return new Date(thisDate);
};

export const getDiscountedPrice = (price: number, discountPercentage: number) => {
  const totalPrice = price - (price * discountPercentage) / 100;
  return totalPrice.toFixed(2);
};
