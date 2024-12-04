import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  onlyUnAuth?: boolean
  component: ReactNode
}

export type ProtectedRouteProps = PropsWithChildren<Props>
