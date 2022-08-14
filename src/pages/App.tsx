import React, { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import { editTodo,fetchPost } from '../store/features/user/userSlice';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { fetchPosts } from '../store/features/user/userApi';
import Header from '../components/Header';
const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	let navigate = useNavigate();
	// console.log('POSTS', user);
	useEffect(() => {
		console.log('USEEE',user)
			  fetchPosts((res:any)=>{
				console.log("initData",res)
				dispatch(fetchPost(res));
			 });
		
	}, []);

	const [edit, setEdit] = useState<Boolean>(false);
	// const addTodoHandler = (data: object) => {
		
	// 	dispatch(addPost(data));
	// };

	const submitEditHandler = (data: object) => {
		dispatch(editTodo(data));
		setEdit(false);
	};
	return (
		<div className='App'>
			{/* <header>
			<Grid container alignContent={'center'} justifyContent={'space-between'} margin={'0 auto'} maxWidth={'98%'} padding={'20px 0px'}>
				<Grid item>
					<Typography variant='h1' fontSize={40} fontWeight={700}>
						Post Feed
					</Typography>
				</Grid>
				<Grid item>
					<Button
					startIcon={<HistoryEduIcon />}
					variant='contained'
					size='large'
					color='primary'
					onClick={()=>{
						navigate('./new-post')
					}}
					>Create a New Post</Button>
					
				</Grid>
			</Grid>
			</header> */}
			<Header />
			<Container>
					{/* <NewPost addTodoHandler={addTodoHandler} /> */}

			<Grid
				container
				alignContent={'center'}
				justifyContent={'center'}
				gap={'30px'}
			>
				{user.posts &&
					user.posts
						.slice(0)
						.reverse()
						.map((post, index) => {
							return (
								<Grid item key={index}>
									<TodoCard
										key={post.id}
										id={post.id}
										title={post.title}
										body={post.body}
										index={index}
										submitEditHandler={submitEditHandler}
										edit={edit}
										setEdit={setEdit}
									/>
								</Grid>
							);
						})}
			</Grid>
			</Container>
		</div>
	);
};

export default App;
