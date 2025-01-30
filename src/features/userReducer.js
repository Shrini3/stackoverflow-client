import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {value: {username: "", email: "", password: ""}},
    reducers: {
        user: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = {username: "", email: "", password: ""}
        }
    }
})

export default userSlice.reducer
export const { user, logout } = userSlice.actions