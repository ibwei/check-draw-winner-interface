import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

// @ts-ignore
import { save, load } from 'redux-localstorage-simple'

import { useDispatch } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { getThemeCache } from 'utils/theme'
import application from './application/reducer'
import { updateVersion } from './global/actions'
import blockReducer from './block'

const safeCloneDeep = <T>(state: T) => {
  try {
    return JSON.parse(JSON.stringify(state)) as T
  } catch (error) {
    console.error(error)
    return cloneDeep(state)
  }
}

type MergedState = {
  user: {
    [key: string]: any
  }
  transactions: {
    [key: string]: any
  },
  profile: {
    [key: string]: any
  }
}
const PERSISTED_KEYS: string[] = ['user', 'transactions']
const loadedState = load({
  states: PERSISTED_KEYS,
}) as MergedState
if (loadedState.user) {
  loadedState.user.userDarkMode = getThemeCache()
}

// @ts-ignore
const store = configureStore({
  reducer: {
    application,
    block: blockReducer,
  },
  // @ts-ignore
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false }), save({ states: PERSISTED_KEYS })],
  // @ts-ignore
  preloadedState: loadedState,
})

store.dispatch(updateVersion())

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<any>()

export default store
