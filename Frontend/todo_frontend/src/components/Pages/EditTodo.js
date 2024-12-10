import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


//loader function 
export const fetchById = async ({params}) => {
  const {id} = params
  const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`)
  if (!response.ok) {
    throw new Error("Couldn't fetch a Todo")
  }
  return response.json()
}

const EditTodo = () => {
//access the details of loader data  
  const {id} = useParams();
  const navigate = useNavigate();
  const todoData = useLoaderData() //set todo data
  const queryClient = useQueryClient();

 
  //set form data values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  // When todoData is available, populate form data (avoid empty fields during initial render)
  useEffect(() => {
    if (todoData) {
      setFormData({
        title: todoData.title || "",
        description: todoData.description || "",
        dueDate: todoData.dueDate || "",
        priority: todoData.priority || "Low", // Set default priority if missing
        status: todoData.status || "Pending", // Set default status if missing
      });
    }
  }, [todoData]);


//updating todo task
const updateTodo = useMutation({
  mutationFn: async ({id, formData}) => {
    const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send updated form data
    })
    if (!response.ok) {
      throw new Error("Couldn't fetch a Todo")
    }
    return response.json()
  },
  onSuccess: () => {
    // Invalidate and refetch the query after a successful mutation
    queryClient.invalidateQueries(["Todos", id]); // Adjust this to your query key
    alert('Updated Todo successfully!')
    navigate('/') // navigate to home page.
  },
  onError: (error) => {
    console.error("Error updating todo:", error);
  }
})

//function to change input values
const handleChange = (e) => {
  const {value, name} = e.target;
  setFormData( prevData => {
    return{
      ...prevData, 
      [name] : value
    }
  })
}

//function to handle submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the id and formData to the mutate function
    updateTodo.mutate({ id, formData });
  }

  return (
    <div>
     <Link className="bg-white my-10 w-[40%] h-10 font-semibold flex pl-3 items-center shadow-md hover:bg-gray-200 duration-700 text-blue-900" to='/'><FontAwesomeIcon to='tasks' icon={faArrowLeftLong} /></Link>  
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
            className="w-full px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {updateTodo.isLoading ? "Updating Todo" : "Update Todo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
