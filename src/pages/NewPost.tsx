import { useEffect,useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { SaveAsSharp } from '@mui/icons-material';

import Form from '../components/Form/index';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { addPost, fetchPost } from '../store/features/user/userSlice';
import { Post } from '../components/Modals/index';
import { addPosts, fetchPosts } from '../store/features/user/userApi';
import Header from '../components/Header';
import './App.scss';
import Loader from '../components/Loader';

const NewPost = () => {
	let navigate = useNavigate();
	const [loading,setLoading]= useState<Boolean>(false)
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
		setLoading(true)
		fetchPosts((res: any) => {
			dispatch(fetchPost(res));
		setLoading(false)

		});
	}, []);
	const onSubmit = (data: object) => {
		setLoading(true)
		let title = Object.values(data)[0];
		let body = Object.values(data)[1];
		let pushObj: Post = {
			userId: 1,
			id: user.posts.length + 1,
			title: title,
			body: body,
		};
		addPosts((res: any) => {
			if (res) {
				dispatch(addPost(res));
				navigate('../');
			}
		}, pushObj);
	};
	return (
		<>
			<Header />
			<Container maxWidth='sm'>
			{loading ?(
				<Loader  height={'90vh'}/>
			):(
				<FormProvider {...methods}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={error ? true : false}
							id='title'
							placeholder='Title'
							helperText={error ? 'Title cannot be Empty' : null}
							variant='standard'
							className='inputs'
							{...register('title', { required: true })}
						/>
						<TextField
							placeholder='Body'
							multiline
							rows={4}
							error={errorBody ? true : false}
							helperText={errorBody ? 'Body cannot be Empty' : null}
							className='inputs'
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
			)}
			</Container>
		</>
	);
};

export default NewPost;
