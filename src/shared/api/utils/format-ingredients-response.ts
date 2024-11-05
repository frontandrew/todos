import { Ingredient } from 'entities/ingredient'
import { IngredientsResponse } from 'shared/api/type'

export const formatIngredientsResponse = (data: IngredientsResponse[]): Ingredient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return data.map(({ _id, image_mobile, image_large, __v, ...rest }) => ({
    id: _id,
    imageMobile: image_mobile,
    imageLarge: image_large,
    ...rest,
  }))
}
