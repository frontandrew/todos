import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Input, Button, PasswordInput } from 'uikit'
import { useForm } from 'hooks'

import style from './style.module.css'

export const ResetPassPage: FC = () => {
  const { formRef, formValues, formChange, formSubmit } = useForm({
    submitHandler: (args) => console.log(args),
    formInitValues: { password: '', code: '' },
  })

  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={formSubmit}
        onChange={formChange}
        ref={formRef}
      >
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <PasswordInput
          onChange={() => {
          }}
          placeholder={'Введите новый пароль'}
          value={formValues.password || ''}
          name={'password'}
        />
        <Input
          onChange={() => {
          }}
          placeholder={'Введите код из письма'}
          value={formValues.code || ''}
          name={'code'}
        />
        <Button htmlType="submit">Сохранить</Button>
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
