import { Ingredient } from 'entities/ingredient';
import { IngredientsResponseData } from './type';

export const formatIngredientsResponse = (data: IngredientsResponseData): Ingredient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return data.map(({ _id, image_mobile, image_large, __v, ...rest }) => ({
    id: _id,
    imageMobile: image_mobile,
    imageLarge: image_large,
    ...rest,
  }))
}
