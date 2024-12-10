import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 } from "react-router-dom";
import AuthProvider from "./components/Hooks/AuthContext";

//layouts components
import MainLayout from "./components/Layouts/MainLayout";

//pages component
import HomePage from "./components/Pages/HomePage";
import TaskDetail from "./components/Pages/TasksDetail"
import TodoForm from "./components/Pages/TodoForm";
import EditTodo,{ fetchById }   from "./components/Pages/EditTodo";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";


 const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />}/>
    <Route path=":id" element={<TaskDetail />}/>
    <Route path="form" element={<TodoForm />}/>
    <Route path="login" element={<Login />}/>
    <Route path="signup" element={<Signup />}/>
    <Route path="edit/:id" element={<EditTodo />} loader={fetchById}/>
  </Route>
 ))

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  );
}

export default App;
