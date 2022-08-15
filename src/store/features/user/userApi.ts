const baseURL=process.env.REACT_APP_BASE_URL
export const fetchPosts = async (callback: any) => {
	await fetch(`${baseURL}`).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};
export const addPosts = async (callback: any, data: object) => {
	await fetch(`${baseURL}`, {
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
	await fetch(`${baseURL}${data.id}`, {
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
	await fetch(`${baseURL}${data}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => {
		res.json().then((response) => {
			callback(response);
		});
	});
};
