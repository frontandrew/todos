import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TwoColumnLayout } from 'components'

import { BurgerIngredients } from 'features/burger-ingredients'
import { BurgerConstructor } from 'features/burger-constructor'

import style from './style.module.css'

export const MainPage: FC = () => {
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <TwoColumnLayout
          left={<BurgerIngredients/>}
          right={<BurgerConstructor/>}
        />
      </DndProvider>
    </div>
  )
}
