import { Button, InfoIcon } from 'uikit'
import { FC } from 'react'

import { AppHeaderItemProps } from './type'
import style from './style.module.css'
import { useMatch, useNavigate } from 'react-router-dom'

export const AppHeaderItem: FC<AppHeaderItemProps> = ({ to, title, Icon = InfoIcon }) => {
  const nav = useNavigate()
  const match = useMatch(to)

  const iconState = match ? 'primary' : 'secondary'
  const titleState = match ? 'text_color_primary' : 'text_color_inactive'

  return (
    <Button
      onClick={() => nav(to)}
      extraClass={style.itemButton}
      htmlType='button'
      type='secondary'
    >
      <Icon type={iconState} />
      <span className={titleState}>{title}</span>
    </Button>
  )
}
