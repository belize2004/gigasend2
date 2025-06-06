import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import userReducer from './userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

const store = makeStore()
export default store

type AppStore = ReturnType<typeof makeStore>
type RootState = ReturnType<AppStore['getState']>
type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
