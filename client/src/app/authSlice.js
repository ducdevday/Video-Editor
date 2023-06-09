import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/authApi';
export const signIn = createAsyncThunk('auth/signIn', async (params, thunkAPI) => {
    const res = await authApi.signIn(params);
    return res;
});
export const signUp = createAsyncThunk('auth/signUp', async (params, thunkAPI) => {
    const res = await authApi.signUp(params);
    return res;
});
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: '',
        isError: false,
    },
    reducers: {
        resetStoreAuth: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
            console.log('ok');
            // window.storage.removeItem('persist:root');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
            state.isError = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.message !== undefined) {
                state.error = action.payload.message;
                state.isError = true;
            } else {
                state.error = null;
                state.isError = false;
                state.user = action.payload;
            }
        });
    },
});

export const { resetStoreAuth } = authSlice.actions;
export default authSlice.reducer;
