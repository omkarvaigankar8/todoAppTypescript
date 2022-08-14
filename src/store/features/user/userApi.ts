


// export const  fetchUsers = createAsyncThunk('user/fetchUsers', async() => {
// 	return await fetch('https://jsonplaceholder.typicode.com/posts',{method:'GET'}).then((response) =>
// 		response.json()
// 	);
// });
export const fetchPosts=async(callback:any)=>{
     await fetch(`https://jsonplaceholder.typicode.com/posts`).then((res)=>{
        res.json().then((response)=>{
            callback(response)
        })
    })
    // .then((data)=>console.log("DATA",data.result))
}
// export const  addUsers = async () => {
// 	alert("ji")
// 	console.log("data")
// 	await fetch(`https://jsonplaceholder.typicode.com/posts/`).then((response) =>{
// 		response.json()
// 		console.log(response.json())
// 	});
// };