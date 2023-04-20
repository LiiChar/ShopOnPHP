import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alert {
    id: string;
    message: string;
}

interface IInitialState {
    user: Alert[]
}

const initialState: IInitialState = {
    user: []
}

export const userSlice = createSlice({
    name: 'setUser',
    initialState,
    reducers: {
        setAlert: (state: IInitialState, action: PayloadAction<Alert>): void => {
            state.user.push(action.payload)
        },
        deleteAlert: (state: IInitialState, action: PayloadAction<string>): void => {
            state.user = state.user.filter((alert) => alert.id !== action.payload);
        }
    }
})

export default userSlice.reducer
export const {setAlert, deleteAlert} = userSlice.actions