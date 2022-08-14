import React from 'react';
import { useState } from 'react';
import { Post } from '../Modals';
import './card.scss';
import {
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
import { useAppDispatch } from '../../store/app/hooks';
import { deletePost } from '../../store/features/user/userSlice';

interface Props {
	// todo: Todo;
	body: string;
	id: number;
	title: string;
	index: number;
	// removeTodoHandler: (id: number) => void;
	submitEditHandler: (data: object) => void;
	edit: Boolean;
	setEdit: React.Dispatch<React.SetStateAction<Boolean>>;
}
const TodoCard: React.FC<Props> = ({
	title,
	id,
	// removeTodoHandler,
	submitEditHandler,
	edit,
	setEdit,
	index,
	body,
}) => {
	const dispatch = useAppDispatch();
	const [editIndex, setEditIndex] = useState<number>(-1);
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
	const deletePostHandler=(id:number) =>{
		setEdit(!edit);
		dispatch(deletePost(id))
		// if (edit === true) {
		// 	setEditIndex(-1);
		// } else {
		// 	setEditIndex(id);
		// }
	}
	return (
		<Card sx={{ width: 320, height: 320 }}>
			<CardContent className='card_content'>
				{edit && editIndex === id ? (
					<>
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
					</>
				) : (
					<>
						<Typography variant='h3' fontSize={24} fontWeight={700}>
							{title}
						</Typography>
						<Typography>{body}</Typography>
					</>
				)}
				<ButtonGroup
					className='buttonGroup'
					variant='contained'
					disabled={!edit && editIndex !== id ? false : true}
				>
					<Button
						startIcon={<EditIcon />}
						color='primary'
						onClick={() => {
							editTodoHandler(id);
						}}
					>
						Edit
					</Button>
					<Button
						startIcon={<DeleteOutlineOutlinedIcon />}
						color='error'
						onClick={() => {
							deletePostHandler(id);
						}}
					>
						Delete
					</Button>
				</ButtonGroup>
			</CardContent>
		</Card>
	);
};

export default TodoCard;
