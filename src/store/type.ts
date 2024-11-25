import { setupStore } from './store'
import { rootReducer } from './root-reducer'

export type AppState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
