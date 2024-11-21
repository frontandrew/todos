import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BurgerIngredients } from 'features/burger-ingredients'
import { BurgerConstructor } from 'features/burger-constructor'

import style from './style.module.css'

export const MainPage: FC = () => {
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <section className={style.content}>
          <BurgerIngredients />
        </section>
        <section className={style.content}>
          <BurgerConstructor />
        </section>
      </DndProvider>
    </div>
  )
}
