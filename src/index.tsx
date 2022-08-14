import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/app/store';
import NewPost from './pages/NewPost';
const root = ReactDOM.createRoot(
	// const removeTodoHandler = (id: number) => {
	// 	setTodos(todos.filter((event) => id && event.id !== id));
	// };

	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/new-post' element={<NewPost />}  />
				<Route  path="/"  element={<App />}  />
			</Routes>
			{/* <App /> */}
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
