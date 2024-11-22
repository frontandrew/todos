import { FC } from 'react'
import { Button, EmailInput, Input, PasswordInput } from 'uikit'

import style from './style.module.css'

export const ProfileForm: FC = () => {
  return (
    <form className={style.form}>
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
