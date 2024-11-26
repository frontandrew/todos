import { FC, useEffect, useState } from 'react'

import { Button, EmailInput, Input, PasswordInput } from 'uikit'
import { useAppDispatch, useAppSelector, useForm, useHotKey } from 'hooks'
import { apiSlice } from 'api'

import style from './style.module.css'

export const ProfileForm: FC = () => {
  const dispatch = useAppDispatch()
  const { updateUser } = apiSlice.endpoints
  const { user } = useAppSelector((state) => state.user)

  const [isEditMode, setEditMode] = useState(false)

  const { formRef, formValues, formChange, formSubmit, formReset } = useForm({
    submitHandler: (args) => dispatch(updateUser.initiate(args)),
    formInitValues: { ...user!, password: '' },
  })

  const enableEditMode = () => {
    setEditMode(true)
  }

  const handleReset = () => {
    setEditMode(false)
    formReset()
  }

  useHotKey(handleReset, 'Escape')
  useEffect(() => handleReset(), [user])

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
