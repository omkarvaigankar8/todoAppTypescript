export const fetchPosts = async (callback: any) => {
	await fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};
export const addPosts = async (callback: any, data: object) => {
	await fetch(`https://jsonplaceholder.typicode.com/posts`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};

export const editPost = async (callback: any, data:any) => {
	await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};

export const deletePosts = async (callback: any, data: number) => {
	await fetch(`https://jsonplaceholder.typicode.com/posts/${data}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};
