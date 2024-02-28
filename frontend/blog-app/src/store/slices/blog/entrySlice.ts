import { createSlice } from "@reduxjs/toolkit";

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    entries: [],
    count: 0,
    totalRecords: 0,
  },
  reducers: {
    setEntries: (state, actions) => {
      state.entries = actions.payload.entries;
      state.count = actions.payload.count
    },
    setAllEntries: (state, actions) => {
      state.totalRecords = actions.payload.totalRecords
    },
  },
});

export const { setEntries, setAllEntries } = entrySlice.actions;