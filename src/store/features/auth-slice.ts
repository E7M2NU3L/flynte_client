import {createSlice, Slice} from '@reduxjs/toolkit'
interface IAuthStateProps {
    isLoggedin : boolean;
    userData : any;
};

type SliceType = Slice<IAuthStateProps, {
    login: (state: IAuthStateProps , action: {
        payload: any;
        type: string;
    }) => void;
    logout: (state: IAuthStateProps) => void;
}>

const initialState : IAuthStateProps = {
    isLoggedin : false,
    userData : null
}

export const authSlice : SliceType = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state : IAuthStateProps, action) => {
            state.isLoggedin = true;
            state.userData = action.payload;
        },
        logout: (state : IAuthStateProps) => {
            state.isLoggedin = false;
            state.userData = null;
        }
    }
});

export const authReducer = authSlice.reducer;
export const {login, logout} = authSlice.actions;