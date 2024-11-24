import { FC, useEffect, useState } from 'react'
import { Button, EmailInput, Input, PasswordInput } from 'uikit'
import { useForm } from 'hooks'

import style from './style.module.css'

export const ProfileForm: FC = () => {
  const [userData, setUserData] = useState({ email: '', name: '' })

  const { formRef, formValues, formChange, formSubmit, formReset } = useForm({
    submitHandler: (args) => console.log(args),
    formInitValues: { ...userData, password: '' },
  })

  useEffect(() => {
    setUserData({ email: 'magick@mail.com', name: 'Andrew' })
    formReset()
  }, [
    // TODO: call useEffect after user data loading
  ])

  return (
    <form
      ref={formRef}
      onChange={formChange}
      onSubmit={formSubmit}
      onReset={formReset}
      className={style.form}
    >
      <Input
        onChange={() => {}}
        placeholder={'Имя'}
        value={formValues.name || ''}
        name={'name'}
      />
      <EmailInput
        onChange={() => {}}
        placeholder={'E-mail'}
        value={formValues.email || ''}
        name={'email'}
      />
      <PasswordInput
        onChange={() => {}}
        placeholder={'Пароль'}
        value={formValues.password || ''}
        name={'password'}
      />
      <div className={style.actions}>
        <Button
          htmlType={'reset'}
          type={'secondary'}
        >
          Отмена
        </Button>
        <Button
          htmlType={'submit'}
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}
