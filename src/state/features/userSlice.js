import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    plan: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
    },
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, setPlan } = userSlice.actions;

// Select the state you want to keep track of
export const selectUser = state => state.user.user;

export const selectUserPlan = state => state.user.plan;

//Export the mailSlice as a reducer:
export default userSlice.reducer;
