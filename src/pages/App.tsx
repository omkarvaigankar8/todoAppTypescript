import React, { useState,useEffect } from 'react';
import InputField from '../components/Form/InputField';
import { Todo } from '../components/Modals';
import TodoCard from '../components/TodoCard';
import { fetchUsers } from '../store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import './App.css';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);


	const [todos, setTodos] = useState<Todo[]>([]);
	const [edit, setEdit] = useState<Boolean>(false);
	//  useEffect(()=>{
	//  },[todos])
	const addTodoHandler = (data: object) => {
		let pushObj: Todo = {
			id: Date.now(),
			title: Object.values(data).toString(),
			isCompleted: false,
		};
		if (todos) {
			setTodos([...todos, pushObj]);
		}
	};

	const removeTodoHandler = (id: number) => {
		setTodos(todos.filter((event) => id && event.id !== id));
	};
	const submitEditHandler = (data: object) => {
		let arrTodo = Object.entries(data);
		let id = arrTodo[0][0];
		let value = arrTodo[0][1];
		console.log('todo:', todos);
		const newTodos = todos.map((todo) =>
			todo.id === Number(id) ? { ...todo, todo: value } : todo
		);
		console.log("newTodos",newTodos);
		setTodos(newTodos);
		setEdit(false);
	};
	return (
		<div className='App'>
			<h1>App</h1>
			<InputField addTodoHandler={addTodoHandler} />

			{user.users &&
						user.users.map((user,index) => {
							return (<TodoCard
								key={user.id}
								id={user.id}
								title={user.title}
								index={index}
								removeTodoHandler={removeTodoHandler}
								submitEditHandler={submitEditHandler}
								edit={edit}
								setEdit={setEdit}
								
								/>)
			})}



			{/* { todos.map((todo, index) => {
				return (
					<TodoCard
						key={todo.id}
						todo={todo}
						index={index}
						removeTodoHandler={removeTodoHandler}
						submitEditHandler={submitEditHandler}
						edit={edit}
						setEdit={setEdit}
					/>
				);
			})} */}
			


			<div>
			<h2>List of users</h2>
			{user.loading && <div>Loading!!!!!!</div>}
			{!user.loading && user.error && <div>{user.error}</div>}
			{!user.loading && user.users.length > 0 && (
				<div>
					{user.users &&
						user.users.map((user) => {
							return <p key={user.id}>{user.title}</p>;
						})}
				</div>
			)}
		</div>
		</div>
	);
};

export default App;
