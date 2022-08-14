import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '../components/Form/index';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { addPost, fetchPost } from '../store/features/user/userSlice';
import { Button, TextField } from '@mui/material';
import { SaveAsSharp } from '@mui/icons-material';

import { fetchPosts } from '../store/features/user/userApi';
import Header from '../components/Header';
import { Container } from '@mui/system';
import './App.scss'
// interface Props {
// 	addTodoHandler: (e: object) => void;
// }

const NewPost = () => {
	let navigate = useNavigate();

	const user = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();
	const methods = useForm();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods;
	const error = errors['title'];
	const errorBody = errors['body'];

	useEffect(() => {
		fetchPosts((res: any) => {
			console.log('initData', res);
			dispatch(fetchPost(res));
		});
	}, []);
	// const addTodoHandler = (data: object) => {

	// };

	const onSubmit = (data: object) => {
		console.log('data', data);
		dispatch(addPost(data));
		navigate('../');
		console.log('updated ', user);
	};
	return (
		<>
			<Header />
			<Container maxWidth="sm">
				<FormProvider {...methods}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={error ? true : false}
							id='title'
							
							placeholder='Title'
							helperText={error ? 'Title cannot be Empty' : null}
							variant='standard'
							className="inputs"
							{...register('title', { required: true })}
						/>
						<TextField
							placeholder='Body'
							multiline
							rows={4}
							error={errorBody ? true : false}
							// defaultValue=""
							helperText={errorBody ? 'Body cannot be Empty' : null}
							className="inputs"
							variant='standard'
							{...register('body', { required: true })}
						/>
						<Button
							startIcon={<SaveAsSharp />}
							type='submit'
							variant='contained'
							color='primary'
						>
							Submit
						</Button>
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default NewPost;
