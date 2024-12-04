import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Input, Button, PasswordInput, EmailInput } from 'uikit'
import { useAppDispatch, useForm } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const RegisterPage: FC = () => {
  const dispatch = useAppDispatch()
  const { registerUser } = apiSlice.endpoints

  const { formRef, formValues, formChange, formSubmit } = useForm({
    submitHandler: (args) => dispatch(registerUser.initiate(args)),
    formInitValues: { email: '', password: '', name: '' },
  })

  /**
   * TODO: need to clean up before review
   * CREDENTIALS: {
   *  email: 'some@magic.tech',
   *  password: '159753',
   *  name: 'Some Magic'
   * }
   */


  return (
    <div className={style.container}>
      <form
        ref={formRef}
        onChange={formChange}
        onSubmit={formSubmit}
        className={style.form}
      >
        <h1 className={'text text_type_main-medium'}>Регистрация</h1>
        <Input
          onChange={() => {
          }}
          placeholder={'Имя'}
          value={formValues.name || ''}
          name={'name'}
        />
        <EmailInput
          onChange={() => {
          }}
          placeholder={'E-mail'}
          value={formValues.email || ''}
          name={'email'}
        />
        <PasswordInput
          onChange={() => {
          }}
          placeholder={'Пароль'}
          value={formValues.password || ''}
          name={'password'}
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
