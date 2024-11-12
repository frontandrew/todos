// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calcTotalPrice = (items: { [x: string]: any, price: number }[]) => items
  .reduce((total, { price }) => total + price, 0)
