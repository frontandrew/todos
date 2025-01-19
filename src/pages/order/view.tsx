import { FC } from 'react'
import { DetailsPageLayout } from 'components'

import { OrderDetails } from 'features/order-details'

export const OrderPage: FC = () => (
  <DetailsPageLayout>
    <OrderDetails/>
  </DetailsPageLayout>
)
