import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Button, EmailInput } from 'uikit'

import style from './style.module.css'

export const ForgotPassPage: FC = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <EmailInput
          onChange={() => {
          }}
          placeholder={'Укажите e-mail'}
          value={''}
        />
        <Button htmlType="submit">Восстановить</Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Вспомнили пароль?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/login'}>
                Войти
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
