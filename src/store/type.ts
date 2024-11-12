import { setupStore } from './store'
import { rootReduser } from './root-reducer'

export type AppState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
