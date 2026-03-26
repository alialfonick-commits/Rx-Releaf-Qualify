import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
 name: "order",
 initialState: {
  total: 0,
  platformFee: 5,
  paymentStatus: "pending",
  orderId: ""
 },
 reducers: {
  setOrder: (state, action) => {
   return { ...state, ...action.payload }
  }
 }
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer