import React, { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import './App.scss';
import { editTodo, fetchPost } from '../store/features/user/userSlice';
import { Grid} from '@mui/material';
import { Container } from '@mui/system';
import { editPost , fetchPosts } from '../store/features/user/userApi';
import Header from '../components/Header';
import Loader from '../components/Loader';
const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const [edit, setEdit] = useState<Boolean>(false);
	const [loading,setLoading]= useState<Boolean>(false)
	useEffect(() => {
		setLoading(true);
		fetchPosts((res: any) => {
			dispatch(fetchPost(res));
			setLoading(false)
		});
	}, []);

	const submitEditHandler = (data: object) => {
		setLoading(true);
			editPost((res:any)=>{
				if(res){
				dispatch(editTodo(res))
				setLoading(false)
			}
		},data)
		setEdit(false);
	};
	return (
		<div className='App'>
			<Header />
			<Container>
				{loading?(
					<Loader  height={'90vh'}/>
				):(
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
				)}
			</Container>
		</div>
	);
};

export default App;
