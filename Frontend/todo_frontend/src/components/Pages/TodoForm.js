import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

// Function to submit form data to the backend
const addTodo = async (newTodo) => {
  const response = await fetch("http://localhost:3000/todo_app/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("There was an error while submitting the form");
  }

  return response.json();
};

const AddTodoForm = () => {
//navigate to different page
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    subtasks: [{ title: "", completed: false }],
  });

  const queryClient = useQueryClient();

  // useMutation to handle form submission
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
        subtasks: [{ title: "", completed: false }],
      });
      alert("Todo added successfully!");
    },
    onError: (error) => {
      console.error("Error:", error.message);
      alert("Failed to add the Todo");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    navigate('/')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handling the checked input
  const handleSubtaskChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index][name] = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      subtasks: newSubtasks,
    }));
  };

//adding a new subtask
  const addSubtask = () => {
    setFormData((prevData) => ({
      ...prevData,
      subtasks: [...prevData.subtasks, { title: "", completed: false }],
    }));
  };

  return (
    <div className="">
      <Link className="bg-gray-200 mb-11 w-[40%] h-10 font-semibold flex pl-3 items-center shadow-md hover:scale-110 hover:bg-red-200 duration-700 text-blue-900" to='/'><FontAwesomeIcon to='..' icon={faArrowLeftLong} /></Link>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Todo</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={500}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subtasks:</label>
          {formData.subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                name="title"
                placeholder="Subtask title"
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(e, index)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="completed"
                  checked={subtask.completed}
                  onChange={(e) => handleSubtaskChange(e, index)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Completed</span>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Subtask
          </button>
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full px-4 py-2 bg-green-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {mutation.isLoading ? "Submitting..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
