import { FC, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { Input, Button, PasswordInput } from 'uikit'
import { useForm } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const ResetPassPage: FC = () => {
  const navigation = useNavigate()
  const location = useLocation()
  const [handleSubmit, { data }] = apiSlice.useLazyResetPassQuery()

  useEffect(() => {
    if (!location.state?.isEmailSent) navigation('/forgot-password')
  }, [])

  useEffect(() => {
    if (data?.success) navigation('/login', { state: null })
  }, [data, navigation])

  const {
    formRef,
    formValues,
    formErrors,
    formChange,
    formSubmit,
    formValidity,
    checkFieldValidity,
  } = useForm({
    submitHandler: handleSubmit,
    formInitValues: { password: '', token: '' },
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
          placeholder={'Введите новый пароль'}
          value={formValues.password ?? ''}
          name={'password'}
          onBlur={checkFieldValidity}
          minLength={6}
          required={true}
          tabIndex={1}
          errorText={formErrors.password}
          // @ts-expect-error-next-line
          error={!!formErrors.password}
          onChange={()=>{}}
        />
        <Input
          placeholder={'Введите код из письма'}
          value={formValues.token ?? ''}
          name={'token'}
          onBlur={checkFieldValidity}
          required={true}
          tabIndex={2}
          errorText={formErrors.token}
          error={!!formErrors.token}
          onChange={()=>{}}
        />
        <Button
          htmlType={'submit'}
          disabled={!formValidity}
          tabIndex={3}
        >
          Сохранить
        </Button>
      </form>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Вспомнили пароль?
            </span>
            <span className={'text text_type_main-small text_color_accent'}>
              <NavLink to={'/login'} tabIndex={4}>
                Войти
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
