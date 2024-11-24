import { FC, useEffect, useState } from 'react'
import { Button, EmailInput, Input, PasswordInput } from 'uikit'
import { useForm } from 'hooks'

import style from './style.module.css'

export const ProfileForm: FC = () => {
  const [userData, setUserData] = useState({ email: '', name: '' })
  const [isEditMode, setEditMode] = useState(false)

  const { formRef, formValues, formChange, formSubmit, formReset } = useForm({
    submitHandler: (args) => console.log(args),
    formInitValues: { ...userData, password: '2123123' },
  })

  useEffect(() => {
    setUserData({ email: 'magick@mail.com', name: 'Andrew' })
    setEditMode(false)
    formReset()
  }, [
    // TODO: call useEffect after user data loading
  ])

  const enableEditMode = () => {
    setEditMode(true)
  }

  const handleReset = () => {
    setEditMode(false)
    formReset()
  }


  return (
    <form
      ref={formRef}
      onChange={formChange}
      onSubmit={formSubmit}
      onReset={handleReset}
      className={style.form}
    >
      <Input
        onIconClick={enableEditMode}
        onChange={() => {
        }}
        name={'name'}
        placeholder={'Имя'}
        value={formValues.name || ''}
        disabled={!isEditMode}
        {...{ icon: isEditMode ? undefined : 'EditIcon' }}
      />
      <EmailInput
        // @ts-expect-error-next-line
        onIconClick={enableEditMode}
        onChange={() => {
        }}
        name={'email'}
        placeholder={'E-mail'}
        value={formValues.email || ''}
        disabled={!isEditMode}
        {...{ icon: isEditMode ? undefined : 'EditIcon' }}
      />
      <PasswordInput
        // onIconClick={enableEditMode}
        onChange={() => {
        }}
        name={'password'}
        placeholder={'Пароль'}
        value={formValues.password || ''}
        disabled={!isEditMode}
      />
      {isEditMode &&
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
        </div>}
    </form>
  )
}
