import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Button, EmailInput, PasswordInput } from 'uikit'

import style from './style.module.css'

export const LoginPage: FC = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1 className={'text text_type_main-medium'}>Вход</h1>
        <EmailInput
          onChange={() => {
          }}
          placeholder={'E-mail'}
          value={''}
        />
        <PasswordInput
          onChange={() => {
          }}
          placeholder={'Пароль'}
          value={''}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Вы — новый пользователь?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/register'}>
                Зарегистрироваться
              </NavLink>
            </span>
          </li>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Забыли пароль?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/forgot-password'}>
                Восстановить пароль
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}