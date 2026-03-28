import { createSlice } from "@reduxjs/toolkit"

// ✅ define initialState separately (important)
const initialState = {
  clinic: "RxReleaf",
  state: "",
  examId: "",
  examTitle: "",
  packageId: "",
  packageTitle: "",
  packagePrice: 0
}

const visitSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {
    setVisitDetails: (state, action) => {
      return { ...state, ...action.payload }
    },

    // ✅ ADD THIS
    clearVisit: () => initialState
  }
})

export const { setVisitDetails, clearVisit } = visitSlice.actions
export default visitSlice.reducer