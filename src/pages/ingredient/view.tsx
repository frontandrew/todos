import { FC } from 'react'
import { DetailsPageLayout } from 'components'

import { IngredientDetails } from 'entities/ingredient'

export const IngredientPage: FC = () => {
  return (
    <DetailsPageLayout>
      <IngredientDetails />
    </DetailsPageLayout>
  )
}
