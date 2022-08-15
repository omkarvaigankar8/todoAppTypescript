import React from 'react';
import { useState } from 'react';
import { Post } from '../Modals';
import './card.scss';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	TextField,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '../Form/index';
import { SaveAltRounded } from '@mui/icons-material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { deletePost } from '../../store/features/user/userSlice';
import { deletePosts } from '../../store/features/user/userApi';
import Loader from '../Loader';

interface Props {
	body: string;
	id: number;
	title: string;
	index: number;
	submitEditHandler: (data: object) => void;
	edit: Boolean;
	setEdit: React.Dispatch<React.SetStateAction<Boolean>>;
}
const TodoCard: React.FC<Props> = ({
	title,
	id,
	submitEditHandler,
	edit,
	setEdit,
	index,
	body,
}) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const [editIndex, setEditIndex] = useState<number>(-1);
	const [loading, setLoading] = useState<Boolean>(false);
	const methods = useForm();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = methods;
	const error = errors['title'];
	const errorBody = errors['body'];
	const editTodoHandler = (id: number) => {
		setEdit(!edit);
		if (edit === true) {
			setEditIndex(-1);
		} else {
			setEditIndex(id);
		}
	};
	const deletePostHandler = (id: number) => {
		setLoading(true);
		const newPosts =
			user &&
			user.posts &&
			user.posts.filter(function (event) {
				return id && event.id !== id;
			});
		deletePosts((res: any) => {
			if (res) {
				dispatch(deletePost(newPosts));
				setEditIndex(-1);
				setEditIndex(id);
				setLoading(false);
			}
		}, id);
	};
	return (
		<Card sx={{ width: 320, height: 320 }} className='post_card'>
			{loading ? (
				<Loader height={'100%'} />
			) : (
				<CardContent className='card_content'>
					{edit && editIndex === id ? (
						<Box className='edit_container'>
							<FormProvider {...methods}>
								<Form
									onSubmit={(data) => {
										setValue('id', id);
										handleSubmit(submitEditHandler)(data);
										setEditIndex(-1);
									}}
								>
									<TextField
										error={error ? true : false}
										id='title'
										placeholder='Title'
										defaultValue={title}
										helperText={error ? 'Title cannot be Empty' : null}
										variant='standard'
										{...register('title', { required: true })}
									/>
									<TextField
										placeholder='Body'
										multiline
										rows={4}
										error={errorBody ? true : false}
										defaultValue={body}
										helperText={errorBody ? 'Body cannot be Empty' : null}
										variant='standard'
										{...register('body', { required: true })}
									/>
									<ButtonGroup className='buttonGroup' variant='contained'>
										<Button
											startIcon={<SaveAltRounded />}
											type='submit'
											color='primary'
										>
											Save
										</Button>
										<Button
											startIcon={<CancelOutlinedIcon />}
											color='error'
											onClick={() => {
												editTodoHandler(id);
											}}
										>
											Cancel
										</Button>
									</ButtonGroup>
								</Form>
							</FormProvider>
						</Box>
					) : (
						<>
							<Typography variant='h3' fontSize={24} fontWeight={700}>
								{title}
							</Typography>
							<Typography>{body}</Typography>
						</>
					)}
					{editIndex !== id && (
						<ButtonGroup className='buttonGroup' variant='contained'>
							<Button
								startIcon={<EditIcon />}
								color='primary'
								disabled={!edit && editIndex !== id ? false : true}
								onClick={() => {
									editTodoHandler(id);
								}}
							>
								Edit
							</Button>
							<Button
								startIcon={<DeleteOutlineOutlinedIcon />}
								disabled={!edit && editIndex !== id ? false : true}
								color='error'
								onClick={() => {
									deletePostHandler(id);
								}}
							>
								Delete
							</Button>
						</ButtonGroup>
					)}
				</CardContent>
			)}
		</Card>
	);
};

export default TodoCard;
