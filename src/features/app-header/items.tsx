import { BurgerIcon, ListIcon, ProfileIcon } from 'uikit'

export const appHeaderItems = {
  home: {
    to: '/',
    title: 'Конструктор',
    Icon: BurgerIcon,
  },
  feed: {
    to: '/feed',
    title: 'Лента заказов',
    Icon: ListIcon,
  },
  spacer: { to: '' },
  profile: {
    to: '/profile',
    title: 'Личный кабинет',
    Icon: ProfileIcon,
  },
} as const
