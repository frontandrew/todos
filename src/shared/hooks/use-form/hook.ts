import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

export const useForm = <T>({ submitHandler, formInitValues }: { submitHandler:
(args: T) => void, formInitValues: T
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formValues, setFormValues] = useState<{[K in keyof T]: T[K]}>(formInitValues)

  useEffect(() => {
    const firstInput = formRef.current?.elements[0]
    if (firstInput) (firstInput as HTMLInputElement).focus()
  }, [])

  const formChange = useCallback((event: FormEvent) => {
    const { value, name } = event.target as HTMLInputElement
    setFormValues({ ...formValues, [name]: value })
  }, [formValues])

  const formSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    const isValid = Object
      .values(formValues)
      .every(value => Boolean(value))
    if (submitHandler && isValid) submitHandler({ ...formValues })
  }, [formValues, submitHandler])

  const formReset = useCallback((event: FormEvent) => {
    event.preventDefault()
    setFormValues(formInitValues)
  }, [formInitValues])

  return { formRef, formValues, formChange, formSubmit, formReset }
}
