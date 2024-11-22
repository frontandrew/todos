import { BurgerIcon, ListIcon, ProfileIcon } from 'uikit'

export const appHeaderItems = {
  home: {
    to: '/',
    title: 'Конструктор',
    Icon: BurgerIcon,
  },
  orders: {
    to: '/orders',
    title: 'Лента заказов',
    Icon: ListIcon,
  },
  profile: {
    to: '/profile',
    title: 'Личный кабинет',
    Icon: ProfileIcon,
  },
} as const
