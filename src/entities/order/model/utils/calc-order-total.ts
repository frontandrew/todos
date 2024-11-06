import { IngredientType } from 'entities/ingredient';
import { CalcOrderTotal } from './type';

export const calcOrderTotal: CalcOrderTotal = (items) => items
  .reduce((total, { price, type }) => {
    return (type === IngredientType[0] ? price * 2 : price) + total
  }, 0)
