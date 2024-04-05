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
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        signoutSuccess: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { signupSuccess, signoutSuccess, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
