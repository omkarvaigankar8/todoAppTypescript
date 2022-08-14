import { Post } from './../../../components/Modals/index';
import {
	createSlice,
	PayloadAction,
	current,
} from '@reduxjs/toolkit';
interface InitialState {
	// loading: boolean;
	posts: Post[];
	// error: string;
}

const initialState: InitialState = {
	// loading: false,
	posts: [],
	// error: '',
};

// export const  fetchUsers = createAsyncThunk('user/fetchUsers', async() => {
// 	return await fetch('https://jsonplaceholder.typicode.com/posts',{method:'GET'}).then((response) =>
// 		response.json()
// 	);
// });
// export const addUser = (data,callBack)=>{
// 	fetch('user/addUsers',{method:'POST',data}).then((res)=>{
// 		callBack(res.json())
// 	})
// }
//   export const  addUsers = createAsyncThunk('user/addUsers', async(sendObj:object) => {
// 	alert("ji")
// 	console.log("data",sendObj)
// 	return await fetch(`https://jsonplaceholder.typicode.com/posts/`).then((response) =>{
// 		response.json()
// 		console.log(response.json())
// 	});
// });
// export const  deleteUsers = createAsyncThunk('user/deleteUsers', async(id) => {
// 	return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method:'DELETE'}).then((response) =>
// 		response.json()
// 	);
// });

const userSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		fetchPost:(state,action:PayloadAction<Post[]>) => {
				const posts=current(state.posts)
				console.log("current Posts",posts)
				if(posts.length == 0){
					state.posts = action.payload;
				}
				else{
					state.posts=posts
				}
				console.log("current Posts",posts)
				console.log("initial payload",action.payload)

		},
		editTodo: (state, action: PayloadAction<object>) => {
			const posts = current(state.posts);
			console.log("PAYLOAD",action.payload)
			let arrTodo = Object.entries(action.payload);
			console.log('arrTodo',arrTodo)
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
		addPost:(state,action:PayloadAction<object>)=>{
			const posts = current(state.posts)
			console.log("Add",posts)
			let title=Object.values(action.payload)[0]
			let body=Object.values(action.payload)[1]
			let pushObj: Post = {
				userId:1,
				id: (posts.length)+1,
				title: title,
				body: body,
			};
			let sendObj={
				method: 'POST',
    			headers: { 'Content-Type': 'application/json' },
    			body: JSON.stringify(pushObj)
			}
			console.log("push",sendObj)
			// addUsers(sendObj) 
			state.posts=[...state.posts,pushObj]
			console.log("SSS",state.posts)

		},
		deletePost:(state,action:PayloadAction<number>)=>{
			const posts = current(state.posts);	
			const newPosts = posts && posts.filter(function (event) {
				return action.payload && event.id !== action.payload;
			  });
			  console.log("AFTER DELETE",newPosts)
			  state.posts=newPosts;
		}
	},
});
export default userSlice.reducer;
export const { editTodo,addPost,fetchPost,deletePost } = userSlice.actions;
