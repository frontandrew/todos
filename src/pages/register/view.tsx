import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Input, Button, PasswordInput, EmailInput } from 'uikit'
import { useAppDispatch, useForm } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const RegisterPage: FC = () => {
  const dispatch = useAppDispatch()
  const { registerUser } = apiSlice.endpoints

  const {
    formRef,
    formValues,
    formChange,
    formErrors,
    formValidity,
    formSubmit,
    checkFieldValidity,
  } = useForm({
    submitHandler: (args) => dispatch(registerUser.initiate(args)),
    formInitValues: { email: '', password: '', name: '' },
  })

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
          onChange={() => {}}
          placeholder={'Имя'}
          value={formValues.name || ''}
          name={'name'}
          onBlur={checkFieldValidity}
          required={true}
          tabIndex={1}
          errorText={formErrors.name}
          error={!!formErrors.name}
        />
        <EmailInput
          placeholder={'E-mail'}
          value={formValues.email || ''}
          name={'email'}
          onBlur={checkFieldValidity}
          required={true}
          tabIndex={2}
          errorText={formErrors.email}
          // @ts-expect-error-next-line
          error={!!formErrors.email}
        />
        <PasswordInput
          placeholder={'Пароль'}
          value={formValues.password || ''}
          name={'password'}
          onBlur={checkFieldValidity}
          minLength={6}
          required={true}
          tabIndex={3}
          errorText={formErrors.password}
          // @ts-expect-error-next-line
          error={!!formErrors.password}
        />
        <Button
          htmlType={'submit'}
          disabled={!formValidity}
          tabIndex={4}
        >
          Зарегистрироваться
        </Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Уже зарегистрированы?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/login'} tabIndex={5}>
                Войти
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
