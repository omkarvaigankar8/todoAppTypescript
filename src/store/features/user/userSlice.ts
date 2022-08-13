import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'

interface User{
    id:number,
    title:string,
    completed:boolean
}


interface InitialState{
    loading:boolean,
    users:User[],
    error:string
}

const initialState:InitialState={
    loading:false,
    users:[],
    error:''
}

export const fetchUsers= createAsyncThunk('user/fetchUsers',()=>{
    return fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response)=> response.json())
})


const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUsers.fulfilled,(state,action:PayloadAction<User []>)=>{
            state.loading=false
            state.users=action.payload
            state.error=''
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.users=[]
            state.error=action.error.message || 'Something went wrong'
        })
    }
})
export default userSlice.reducer