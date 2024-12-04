import { FC } from 'react'

import { ProtectedRouteProps } from './type'
import { useAppSelector } from 'hooks'
import { AppLoader } from 'features/app-loader'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyUnAuth = false, component }) => {
  const { isAuthChecked } = useAppSelector(state => state.authState)
  const { user } = useAppSelector(state => state.user)
  const location = useLocation()

  if (!isAuthChecked) return <AppLoader/>
  if (!onlyUnAuth && !user) return <Navigate to={'/login'} state={{ from: location }}/>
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from}/>
  }

  return component
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({ component }: { component: ProtectedRouteProps['component'] }) => (
  <ProtectedRoute onlyUnAuth={true} component={component}/>
)
