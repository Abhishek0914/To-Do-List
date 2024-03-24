"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
require("../components/Todo.css");
const Todo = () => {
    const [todoList, setTodoList] = (0, react_1.useState)([]);
    const [editableId, setEditableId] = (0, react_1.useState)(null);
    const [editedTask, setEditedTask] = (0, react_1.useState)("");
    const [editedStatus, setEditedStatus] = (0, react_1.useState)("");
    const [newTask, setNewTask] = (0, react_1.useState)("");
    const [newStatus, setNewStatus] = (0, react_1.useState)("");
    const [newDeadline, setNewDeadline] = (0, react_1.useState)("");
    const [editedDeadline, setEditedDeadline] = (0, react_1.useState)("");
    // Fetch tasks from database 
    (0, react_1.useEffect)(() => {
        axios_1.default.get('http://127.0.0.1:3001/getTodoList')
            .then(result => {
            setTodoList(result.data);
        })
            .catch(error => {
            console.error('Error fetching todo list:', error);
        });
    }, []);
    // Function to toggle the editable state for a specific row 
    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTask(rowData.task);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline || "");
        }
        else {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };
    // Function to add task to the database 
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }
        axios_1.default.post('http://127.0.0.1:3001/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline })
            .then(res => {
            console.log(res);
            window.location.reload();
        })
            .catch(err => console.log(err));
    };
    // Function to save edited data to the database 
    const saveEditedTask = (id) => {
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
        axios_1.default.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData)
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
    const deleteTask = (id) => {
        axios_1.default.delete('http://127.0.0.1:3001/deleteTodoList/' + id)
            .then(result => {
            console.log(result);
            window.location.reload();
        })
            .catch(err => console.log(err));
    };
    return (react_1.default.createElement("div", { className: "container mt-5" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col-md-7" },
                react_1.default.createElement("h2", { className: "table_heading" }, "List of tasks"),
                react_1.default.createElement("div", { className: "table-responsive" },
                    react_1.default.createElement("table", { className: "table table-bordered" },
                        react_1.default.createElement("thead", { className: "table-primary" },
                            react_1.default.createElement("tr", { className: "table_headings" },
                                react_1.default.createElement("th", null, "Task"),
                                react_1.default.createElement("th", null, "Status"),
                                react_1.default.createElement("th", null, "Deadline"),
                                react_1.default.createElement("th", null, "Actions"))),
                        Array.isArray(todoList) ? (react_1.default.createElement("tbody", null, todoList.map((data) => (react_1.default.createElement("tr", { key: data._id },
                            react_1.default.createElement("td", null, editableId === data._id ? (react_1.default.createElement("input", { className: "form-control", type: "datetime-local", value: editedDeadline instanceof Date ? editedDeadline.toISOString().slice(0, 16) : '', onChange: (e) => setEditedDeadline(e.target.value) })) : (data.task)),
                            react_1.default.createElement("td", null, editableId === data._id ? (react_1.default.createElement("input", { type: "text", className: "form-control", value: editedStatus, onChange: (e) => setEditedStatus(e.target.value) })) : (data.status)),
                            react_1.default.createElement("td", null, editableId === data._id ? (react_1.default.createElement("input", { type: "datetime-local", className: "form-control", value: editedDeadline instanceof Date ? editedDeadline.toISOString().slice(0, 16) : editedDeadline, onChange: (e) => setEditedDeadline(e.target.value) })) : (data.deadline ? new Date(data.deadline).toLocaleString() : '')),
                            react_1.default.createElement("td", null,
                                editableId === data._id ? (react_1.default.createElement("button", { className: "btn btn-success btn-sm", onClick: () => saveEditedTask(data._id) }, "Save")) : (react_1.default.createElement("button", { className: "btn btn-primary btn-sm", onClick: () => toggleEditable(data._id) }, "Edit")),
                                " OR",
                                react_1.default.createElement("button", { className: "btn btn-danger btn-sm ml-1", onClick: () => deleteTask(data._id) }, "Delete"))))))) : (react_1.default.createElement("tbody", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("td", { colSpan: 4 }, "Loading products..."))))))),
            react_1.default.createElement("div", { className: "col-md-5" },
                react_1.default.createElement("h2", { className: "table_heading" }, "Add Task"),
                react_1.default.createElement("form", { className: "bg-light p-4" },
                    react_1.default.createElement("div", { className: "mb-3" },
                        react_1.default.createElement("label", null, "Task"),
                        react_1.default.createElement("input", { className: "form-control", type: "text", placeholder: "Enter Task", onChange: (e) => setNewTask(e.target.value) })),
                    react_1.default.createElement("div", { className: "mb-3" },
                        react_1.default.createElement("label", null, "Status"),
                        react_1.default.createElement("select", { className: "form-control", onChange: (e) => setNewStatus(e.target.value) },
                            react_1.default.createElement("option", { value: "Pending" }, "Pending"),
                            react_1.default.createElement("option", { value: "Done" }, "Done"),
                            react_1.default.createElement("option", { value: "Open" }, "Open"))),
                    react_1.default.createElement("div", { className: "mb-3" },
                        react_1.default.createElement("label", null, "Deadline"),
                        react_1.default.createElement("input", { className: "form-control", type: "datetime-local", onChange: (e) => setNewDeadline(e.target.value) })),
                    react_1.default.createElement("button", { onClick: addTask, className: "btn btn-success btn-sm" }, "Add Task"))))));
};
exports.default = Todo;
