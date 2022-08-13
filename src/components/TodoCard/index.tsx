import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Todo } from '../Modals';

interface Props {
	// todo: Todo;
	id:number;
	title:string;
	index:number;
	removeTodoHandler: (id: number) => void;
    submitEditHandler:(data:object)=>void;
    edit:Boolean,
    setEdit: React.Dispatch<React.SetStateAction<Boolean>>
}
const TodoCard: React.FC<Props> = ({ title,id, removeTodoHandler,submitEditHandler,edit,setEdit,index }) => {
	const methods = useForm();
	const [editIndex,setEditIndex]=useState<number>(-1)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods;
	const error = errors['todo'];
	// const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
	const editTodoHandler = (id: number) => {
		alert("ji")
		setEdit(!edit);
		setEditIndex(id)
	};
	console.log('index:',editIndex,index)
	return (
		<div
		>
			{(edit && (editIndex === id)) ? (
				<form onSubmit={(e)=>{e.preventDefault()
                 handleSubmit(submitEditHandler)(e)
				 setEditIndex(-1)
				 }}>
                    <h1>F</h1>
					<input
						type='text'
						// onChange={(e) => {
						// 	setEditTodoText(e.target.value);
						// }}
						{...register(`${id}`, { required: true })}
					/>
					<input type='submit' />
				</form>
			) : (
				<h2>{title}</h2>
			)}
			<span
				onClick={() => {
					editTodoHandler(id);
				}}
			>
				Edit
			</span>
			{/* <p>{todo.isCompleted}</p> */}
		</div>
	);
};

export default TodoCard;
