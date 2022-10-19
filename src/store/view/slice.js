import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  fields: [],
  name: "",
  bunkers: [],
  intro: null,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    loadIntro: (state, action) => {
      state.intro = action.payload;
    },
    loadFields: (state, action) => {
      state.fields = action.payload;
    },
    viewField: (state, action) => {
      state.bunkers = action.payload.data;
      state.name = action.payload.name;
    },
  },
});

export const { loadFields, viewField, loadIntro } = viewSlice.actions;

export default viewSlice.reducer;
