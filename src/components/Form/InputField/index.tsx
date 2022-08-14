import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '../index';

import { Button, TextField } from '@mui/material';
import { SaveAsSharp } from '@mui/icons-material';
import '../../../pages/App.css';


interface Props {
	addTodoHandler: (e: object) => void;
}

const InputField = ({ addTodoHandler }: Props) => {
	const methods = useForm();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods;
	const error = errors['title'];
	const errorBody = errors['body'];
	const onSubmit = (data: object) => {
		console.log('data', data);
		addTodoHandler(data);
	};
	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						error={error ? true : false}
						id='title'
						label='Title'
						helperText={error?"Title cannot be Empty":null}
						variant="standard"
						{...register('title', { required: true })}
					/>
					<TextField
						label='body'
						multiline
						rows={4}
						error={errorBody ? true : false}
						// defaultValue=""
            helperText={errorBody?"Body cannot be Empty":null}
						variant="standard"
						{...register('body', { required: true })}
					/>
					<Button
          startIcon={<SaveAsSharp />}
          type='submit' variant='contained' color='primary'>
						Submit
					</Button>
				</Form>
			</FormProvider>
		</>
	);
};

export default InputField;
