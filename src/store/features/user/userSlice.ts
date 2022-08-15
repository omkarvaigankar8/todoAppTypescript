import { Post } from './../../../components/Modals/index';
import {
	createSlice,
	PayloadAction,
	current,
} from '@reduxjs/toolkit';
interface InitialState {
	posts: Post[];
}

const initialState: InitialState = {
	posts: [],

};

const userSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		fetchPost:(state,action:PayloadAction<Post[]>) => {
				const posts=current(state.posts)
				if(posts.length === 0){
					state.posts = action.payload;
				}
				else{
					state.posts=posts
				}

		},
		editTodo: (state, action: PayloadAction<object>) => {
			const posts = current(state.posts);
			let arrTodo = Object.entries(action.payload);
			let id = arrTodo[2][1];
			let title = arrTodo[0][1];
			let body = arrTodo[1][1];
			
			const newTodo = posts.map((todo) => {
				if(todo.id === id){
                    return {...todo,body:body,title:title}
                }
                else{
                    return todo;
                }
			});
            state.posts=newTodo;
		},
		addPost:(state,action:PayloadAction<Post>)=>{
			state.posts=[...state.posts,action.payload]
		},
		deletePost:(state,action:PayloadAction<Post[]>)=>{
			  state.posts=action.payload;
		}
	},
});
export default userSlice.reducer;
export const { editTodo,addPost,fetchPost,deletePost } = userSlice.actions;
