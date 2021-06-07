import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const [todoList, setTodoList] = useState([]);
	const [visibility, setVisibility] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/elias")
			.then(resp => resp.json())
			.then(data => setTodoList(data))
			.catch(error => console.log(error));
	}, []);

	const userInterface = todoList.map((todo, index) => {
		return (
			<div
				key={index}
				className="input-style px-5 py-2"
				onMouseEnter={() => setVisibility(index)}
				onMouseLeave={() => setVisibility("")}>
				{todo.label}
				<button
					type="button"
					className={`input-button-style bg-white ${
						visibility === index ? "" : "d-none"
					}`}
					onClick={() => deleteToDo(index)}>
					X
				</button>
			</div>
		);
	});

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/elias", options)
			.then(resp => resp.json().then(data => console.log(data)))
			.then(error => console.log(error));
	};

	const handleKeyPress = e => {
		if (e.target.value !== "" && e.charCode === 13) {
			let newToDo = {
				label: e.target.value,
				done: false
			};
			let newToDoList = [...todoList, newToDo];
			setTodoList(newToDoList);
			updateData(newToDoList);
			e.target.value = "";
			e.preventDefault();
		}
	};

	const deleteToDo = index => {
		var array = [...todoList];
		array.splice(index, 1);
		setTodoList(array);
		updateData(array);
	};

	return (
		<form>
			<div className="card table rounded-0">
				<input
					type="text"
					className="rounded-0 input-style px-5"
					placeholder={
						todoList.length != 0
							? "What needs to be done?"
							: "No tasks, add a task"
					}
					onKeyPress={handleKeyPress}
				/>
				{userInterface}
				<div className="items-left-div px-3 py-3">
					{todoList.length} items left
				</div>
			</div>
		</form>
	);
};
