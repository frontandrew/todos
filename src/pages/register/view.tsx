import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Input, Button, PasswordInput, EmailInput } from 'uikit'

import style from './style.module.css'

export const RegisterPage: FC = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1 className={'text text_type_main-medium'}>Регистрация</h1>
        <Input
          onChange={() => {
          }}
          placeholder={'Имя'}
          value={''}
        />
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
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Уже зарегистрированы?
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
