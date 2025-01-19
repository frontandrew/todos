import { IngredientType } from 'entities/ingredient';
import { CalcTotal } from './type';

export const calcTotal: CalcTotal = (items) => items
  .reduce((total, { price, type }) => {
    return (type === IngredientType.BUN ? price * 2 : price) + total
  }, 0)
