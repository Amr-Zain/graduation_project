import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, createUserSession } from "../api/data";
//{ chatId:'',img:'', name:'', lastMessage:''}
const initialState = {
    connections:[
        { chatId:'sdff',img:'/images/avatars/default.png', name:'Ahmed Mohamed', lastMessage:'dfd  sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff sdff7hfcd sdfkj'},
        { chatId:'sdfdf',img:'/images/avatars/default.png', name:'Ahmed Mohamed', lastMessage:' sdff sdff sdff sdff sdff sdff sdffdfd hfcd sdfkj'},
        { chatId:'sddff',img:'/images/avatars/default.png', name:'Ahmed Mohamed', lastMessage:'dfd hfcd sdfkj'},
        { chatId:'sdfddf',img:'/images/avatars/default.png', name:'Ahmed Mohamed', lastMessage:'dfd hfcd sdfkj'},
        { chatId:'sdfdddf',img:'/images/avatars/default.png', name:'Ahmed Mohamed', lastMessage:'dfd hfcd sdfkj'},

    ],
    show: false,
    isLoading: false,
    messages:[
        {id: 'daskljf', from: 'dskfhkldsjklf', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'dddskljf', from: 'dsfkjl', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'dskldjf', from: 'dskfhkldsjklf', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'dskldjf', from: 'dskfhkldsjklf', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'ddskdljf', from: 'dsfkjl', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'dskldjf', from: 'dskfhkldsjklf', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'ddskdljf', from: 'dsfkjl', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
        {id: 'ddskdljf', from: 'dsfkjl', to:'dsjklf', date:Date.now(),message:'plrease send the attachments'},
    ]
}
export const getConnections = createAsyncThunk('chat/getConnections', 
    async ({ type }, thunkAPI)=>{
    try {
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getChat = createAsyncThunk('chat/getChat', 
    async ({ type }, thunkAPI)=>{
    try {
        
    } catch (error) {
        //setError({error: error.message})
        return thunkAPI.rejectWithValue(error.message);
    }
});
const chats = createSlice({
    name:'chats',
    initialState,
    reducers: {
        addMessages: (state,{ payload })=>{
            state.messages = [ ...state.messages, ...payload.messages ];
        },
        deleteMessage: (state,{ payload })=>{
            state.chat = state.chat.filter(chat=>chat.message.id === payload.id);
        },
    },
    extraReducers:  (builder) => {
        builder
            .addCase(getConnections.fulfilled, (state, { payload}) => {
                //console.log(action);
                state.isLoading = false;
                state.connections = payload.connections;
            })
            .addCase(getConnections.pending, (state, { payload}) => {
                state.isLoading = true;
            })
            .addCase(getChat.fulfilled, (state, { payload}) => {
                //console.log(action);
                state.isLoading = false;
                state.chat = payload.chat;
            })
            .addCase(getChat.pending, (state, { payload}) => {
                state.isLoading = true;
            });
    },
});

export const { addMessages, deleteMessage } = chats.actions;

export default chats.reducer;