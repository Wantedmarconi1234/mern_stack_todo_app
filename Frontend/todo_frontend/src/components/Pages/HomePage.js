import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faCircle, faPencil, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the token
  const getToken = JSON.parse(localStorage.getItem('user'));
  
  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/todo_app/todo/', {
        headers: {
          Authorization: `Bearer ${getToken.token}`, // Include the token
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a todo
  const deleteTodo = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      // Refetch todos after deletion
      fetchTodos();
    } catch (err) {
      console.error('Deletion failed:', err.message);
    }
  }, [fetchTodos]);

  // Handle deletion with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete?')) {
      deleteTodo(id);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Conditional rendering for loading and error states
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Oops... {error}</h1>;

  return (
    <div>
      <div className="flex justify-between">
        <small className="text-[11px] font-extrabold text-gray-400">{`${todos.length} ${
          todos.length === 1 ? 'todo' : 'todos'
        }`}</small>
        <Link
          to="form"
          className="hover:scale-110 duration-1000 hover:text-blue-600 grid place-content-center text-4xl text-blue-400 bg-white shadow-md w-[20px] h-[30px]"
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
      </div>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="relative hover:bg-gray-200 hover:scale-110 hover:duration-700 min-h-[100px] flex items-center rounded bg-white shadow-sm my-5 py-5 px-[20px]"
        >
          <FontAwesomeIcon icon={faCircle} className="w-3 mr-5 text-orange-500" />
          <div>
            <h1
              className={`${
                todo.status === 'Completed' && 'line-through decoration-red-500 decoration-[2px]'
              } font-bold text-base text-blue-500`}
            >
              {todo.title}
            </h1>
            <small className="text-[10px] font-bold text-gray-400">{todo.createdAt}</small>
          </div>
          <small className="mx-auto font-semibold text-[10px] text-gray-500">{todo.status}</small>
          <div className="w-[80px] flex justify-between">
            <Link to={`edit/${todo._id}`}>
              <FontAwesomeIcon icon={faPencil} className="text-blue-900 cursor-pointer hover:text-red-500" />
            </Link>
            <Link to={`:${todo._id}`}>
              <FontAwesomeIcon icon={faEye} className="text-blue-900 cursor-pointer hover:text-red-500" />
            </Link>
            <Link onClick={() => handleDelete(todo._id)}>
              <FontAwesomeIcon icon={faTrashCan} className="text-blue-900 cursor-pointer hover:text-red-500" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
