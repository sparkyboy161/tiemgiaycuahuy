
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    email: null,
    avatar: null,
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.avatar = action.payload.photoURL
        },
        setUserLogOutState: state => {
            state.displayName = null
            state.email = null
            state.avatar = null
        }
    }
})

const { reducer, actions } = user;
export const { setActiveUser, setUserLogOutState } = actions;

export const selectUserDisplayname = state => state.user.displayName;
export const selectUserEmail = state => state.user.email;
export const selectUserAvatar = state => state.user.avatar;

export default reducer;