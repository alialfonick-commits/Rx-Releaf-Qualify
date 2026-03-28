import { configureStore, combineReducers } from '@reduxjs/toolkit'
import visitReducer from './visitSlice'
import patientReducer from './patientSlice'
import orderReducer from './orderSlice'

import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ✅ persist config (ONLY visit)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['visit'],
}

// combine reducers
const rootReducer = combineReducers({
  visit: visitReducer,
  patient: patientReducer,
  order: orderReducer,
})

// wrap with persist
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
})

export const persistor = persistStore(store)

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch