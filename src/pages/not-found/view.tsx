import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'uikit'

import style from './style.module.css'

export const NotFoundPage: FC = () => {
  const navigation = useNavigate()

    return (
    <article className={style.container}>
      <div className={style.header}>
        <h1 className={style.title + ' text text_type_main-large'}>404</h1>
        <h3 className={'text text_type_main-large'}>Что-то пошло не так...</h3>
      </div>
      <nav>
        <ul className={style.navlist}>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Мы уже получили сообщение о проблеме и отправили дроидов на ремонт.
            </span>
          </li>
          <li className={style.navitem}>
            <span className={'text text_type_main-small text_color_inactive'}>
              Попробуйте снова или вернитесь позже.
            </span>
          </li>
        </ul>
      </nav>
      <Button htmlType={'button'} type={'secondary'} onClick={() => navigation(-1)}>
        Назад
      </Button>
    </article>
  )
}
