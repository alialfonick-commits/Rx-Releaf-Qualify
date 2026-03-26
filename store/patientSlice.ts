import { createSlice } from "@reduxjs/toolkit"

const patientSlice = createSlice({
 name: "patient",
 initialState: {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  birthSex: ""
 },
 reducers: {
  setPatientInfo: (state, action) => {
   return { ...state, ...action.payload }
  }
 }
})

export const { setPatientInfo } = patientSlice.actions
export default patientSlice.reducer