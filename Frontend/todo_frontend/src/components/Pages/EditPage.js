import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch a specific todo by ID
const fetchTodoById = async (id) => {
  const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching Todo");
  }
  return response.json();
};

// Function to update a Todo
const updateTodo = async ({ id, updatedTodo }) => {
  const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error("Error updating Todo");
  }

  return response.json();
};

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  // Fetch the existing Todo data using the `id`
  const { data: todo, isLoading } = useQuery({
    queryKey: ["Todo", id],
    queryFn: () => fetchTodoById(id),
    onSuccess: (data) => {
      // Prepopulate the form with the existing data
      setFormData({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
      });
    },
  });

  // Mutation for updating the todo
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
      alert("Todo updated successfully");
      navigate("/"); // Redirect to the home page after successful update
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, updatedTodo: formData });
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {mutation.isLoading ? "Updating..." : "Update Todo"}
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
