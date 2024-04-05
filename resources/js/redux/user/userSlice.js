import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signupSuccess } = userSlice.actions;

export default userSlice.reducer;
