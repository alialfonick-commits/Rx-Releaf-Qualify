import { createSlice } from "@reduxjs/toolkit"

const visitSlice = createSlice({
 name: "visit",
 initialState: {
  clinic: "RxReleaf",
  state: "",
  examId: "",
  examTitle: "",
  packageId: "",
  packageTitle: "",
  packagePrice: 0
 },
 reducers: {
  setVisitDetails: (state, action) => {
   return { ...state, ...action.payload }
  }
 }
})

export const { setVisitDetails } = visitSlice.actions
export default visitSlice.reducer