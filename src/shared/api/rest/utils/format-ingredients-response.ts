import { Ingredient } from 'entities/ingredient'
import { RawIngredient } from '../type.ts'

export const formatIngredientsResponse = (array: RawIngredient[]): Ingredient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return array.map(({ _id, image_mobile, image_large, __v, ...rest }) => ({
    id: _id,
    imageMobile: image_mobile,
    imageLarge: image_large,
    ...rest,
  }))
}
