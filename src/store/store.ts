import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import postsReducer from './reducers/postsReducer'
import usersReducer from './reducers/usersReducer'
import { Action, Dispatch } from 'redux'

export interface RootState {
  posts?: typeof postsReducer
  users?: typeof usersReducer
}

export const rootReducer = combineReducers<RootState>({
  posts: postsReducer,
  users: usersReducer,
})

const persistedRootReducer = persistReducer(
  { key: 'root', storage },
  rootReducer
)

export const store = configureStore({
  reducer: persistedRootReducer,
})

export type AppDispatch = Dispatch<Action>

export const persistor = persistStore(store)
