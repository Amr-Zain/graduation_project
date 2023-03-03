import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, createUserSession } from "../api/data";

const initialState = {
    user: {
        userType: 'doctor',
        id: 'qedlnfsnc',
        name: 'Amr Zied',
        email: 'amr@gmail.com',
        description: 'He holds a PhD in Mansoura ',
        phone: '01012121212',
        specialization: 2,
        fees: 299,
        city: 'Mansoura',
        governorate: 'Dakahlia',
        location: 'Jahan Street',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
        age: 30
        },
        token:'',
        refrexhToken: '',
        error:''
}
export const setAuthedUserThunk = createAsyncThunk('authedUser/setAuthedUser', 
    async ({ create, userType, data}, thunkAPI)=>{
    try {
        let newState;
        if(create){
            newState = await createUser({userType, user: data });
        }
        else {
            newState = await createUserSession({ userType, ...data});
        }
        //console.log(newState)
        return { ...newState, userType }
    } catch (error) {
        setError({error: error.message})
        return thunkAPI.rejectWithValue(error.message);
    }
});
const authedUserSlice = createSlice({
    name:'authedUser',
    initialState,
    reducers: {
        setAuthedUser:(state,{ payload })=>{
            state = payload;
        },
        removeAuthedUser:(state,action)=>{
            //console.log(action)
            return initialState;
        },
        updateTokens: (state,{ payload })=>{
            const { token, refrexhToken } = payload;
            if(token && refrexhToken) {
                state = { ...state, token, refrexhToken}
            }else if(token) state = { ...state, token}
        },
        setError: (state, { payload}) =>{
            //console.log('clear error')
            const { error } = payload;
            return { ...state, error}
        }
    },
    extraReducers:  (builder) => {
        builder
            .addCase(setAuthedUserThunk.fulfilled, (state, action) => {
                //console.log(action);
                return action.payload;
            })
            .addCase(setAuthedUserThunk.rejected, (state, { payload}) => {
                console.log(payload)
                state.error = payload;
            });
    },
});

export const { setAuthedUser, removeAuthedUser, updateTokens, setError } = authedUserSlice.actions;

export default authedUserSlice.reducer;