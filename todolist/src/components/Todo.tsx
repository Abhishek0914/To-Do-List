import axios from 'axios'; 
import React, { useEffect, useState } from "react"; 
import "../components/Todo.css";

interface TodoItem {
	_id: string;
	task: string;
	status: string;
	deadline: string | Date;
}

const Todo: React.FC = () => {
	const [todoList, setTodoList] = useState<TodoItem[]>([]); 
	const [editableId, setEditableId] = useState<string | null>(null); 
	const [editedTask, setEditedTask] = useState<string>(""); 
	const [editedStatus, setEditedStatus] = useState<string>(""); 
	const [newTask, setNewTask] = useState<string>(""); 
	const [newStatus, setNewStatus] = useState<string>(""); 
	const [newDeadline, setNewDeadline] = useState<string | Date>("");
	const [editedDeadline, setEditedDeadline] = useState<string | Date>("");


	// Fetch tasks from database 
	useEffect(() => { 
                axios.get<TodoItem[]>('http://127.0.0.1:3001/getTodoList')
        .then(result => { 
            setTodoList(result.data);
        })
        .catch(error => {
            console.error('Error fetching todo list:', error);
  });

	}, []); 

	// Function to toggle the editable state for a specific row 
	const toggleEditable = (id: string) => { 
		const rowData = todoList.find((data) => data._id === id); 
		if (rowData) { 
			setEditableId(id); 
			setEditedTask(rowData.task); 
			setEditedStatus(rowData.status); 
			setEditedDeadline(rowData.deadline || ""); 
		} else { 
			setEditableId(null); 
			setEditedTask(""); 
			setEditedStatus(""); 
			setEditedDeadline(""); 
		} 
	}; 

	// Function to add task to the database 
	const addTask = (e: React.FormEvent) => { 
		e.preventDefault(); 
		if (!newTask || !newStatus || !newDeadline) { 
			alert("All fields must be filled out."); 
			return; 
		} 

		axios.post('http://127.0.0.1:3001/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline }) 
			.then(res => { 
				console.log(res); 
				window.location.reload(); 
			}) 
			.catch(err => console.log(err)); 
	}; 

	// Function to save edited data to the database 
	const saveEditedTask = (id: string) => { 
		const editedData = { 
			task: editedTask, 
			status: editedStatus, 
			deadline: editedDeadline, 
		}; 

		// If the fields are empty 
		if (!editedTask || !editedStatus || !editedDeadline) { 
			alert("All fields must be filled out."); 
			return; 
		} 

		// Updating edited data to the database through updateById API 
		axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
			.then(result => { 
				console.log(result); 
				setEditableId(null); 
				setEditedTask(""); 
				setEditedStatus(""); 
				setEditedDeadline(""); // Clear the edited deadline 
				window.location.reload(); 
			}) 
			.catch(err => console.log(err)); 
	}; 

	// Delete task from database 
	const deleteTask = (id: string) => { 
		axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
			.then(result => { 
				console.log(result); 
				window.location.reload(); 
			}) 
			.catch(err => console.log(err)); 
	}; 

	return ( 
				<div className="container mt-5">
		<div className="row">
			<div className="col-md-7">
			<h2 className="table_heading">List of tasks</h2>
			<div className="table-responsive">
				<table className="table table-bordered">
				<thead className="table-primary">
					<tr className="table_headings">
					<th>Task</th>
					<th>Status</th>
					<th>Deadline</th>
					<th>Actions</th>
					</tr>
				</thead>
				{Array.isArray(todoList) ? (
					<tbody>
					{todoList.map((data) => (
						<tr key={data._id}>
						<td>
							{editableId === data._id ? (
							<input
							className="form-control"
							type="datetime-local"
							value={editedDeadline instanceof Date ? editedDeadline.toISOString().slice(0, 16) : ''}
							onChange={(e) => setEditedDeadline(e.target.value)}
						/>
						
							) : (
							data.task
							)}
						</td>
						<td>
							{editableId === data._id ? (
							<input
								type="text"
								className="form-control"
								value={editedStatus}
								onChange={(e) => setEditedStatus(e.target.value)}
							/>
							) : (
							data.status
							)}
						</td>
						<td> 
						{editableId === data._id ? ( 
							<input 
								type="datetime-local"
								className="form-control"
								value={editedDeadline instanceof Date ? editedDeadline.toISOString().slice(0, 16) : editedDeadline} 
								onChange={(e) => setEditedDeadline(e.target.value)} 
							/> 
						) : ( 
							data.deadline ? new Date(data.deadline).toLocaleString() : ''
						)} 
						</td> 


						<td>
							{editableId === data._id ? (
							<button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
								Save
							</button>
							) : (
							<button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}>
								Edit
							</button>
							)} OR
							<button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}>
							Delete
							</button>
						</td>
						</tr>
					))}
					</tbody>
				) : (
					<tbody>
					<tr>
						<td colSpan={4}>Loading products...</td>
					</tr>
					</tbody>
				)}
				</table>
			</div>
			</div>
			<div className="col-md-5">
			<h2 className="table_heading">Add Task</h2>
			<form className="bg-light p-4">
				<div className="mb-3">
				<label>Task</label>
				<input
					className="form-control"
					type="text"
					placeholder="Enter Task"
					onChange={(e) => setNewTask(e.target.value)}
				/>
				</div>
				<div className="mb-3">
				<label>Status</label>
				<select
					className="form-control"
					onChange={(e) => setNewStatus(e.target.value)}
				>
					<option value="Pending">Pending</option>
					<option value="Done">Done</option>
					<option value="Open">Open</option>
				</select>

				</div>
				<div className="mb-3">
				<label>Deadline</label>
				<input
					className="form-control"
					type="datetime-local"
					onChange={(e) => setNewDeadline(e.target.value)}
				/>
				</div>
				<button onClick={addTask} className="btn btn-success btn-sm">
				Add Task
				</button>
			</form>
			</div>
		</div>
		</div>

	) 
} 
export default Todo;

