import { configureStore } from '@reduxjs/toolkit'
import visitReducer from './visitSlice'
import patientReducer from './patientSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
 reducer: {
  visit: visitReducer,
  patient: patientReducer,
  order: orderReducer
 }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch