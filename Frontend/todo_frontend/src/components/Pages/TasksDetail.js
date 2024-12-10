import { useParams, Link } from "react-router-dom"
import {useQuery} from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'




function TasksDetail() {
  const {id} = useParams()

  //slice the first index
  const taskID = id.slice(1)

  //fetch request for detailed task
  const {data, isLoading, error } = useQuery({
  queryKey: ["Task"],
  queryFn: async () => {
    const response = await fetch(`http://localhost:3000/todo_app/todo/${taskID}`)
    const data = await response.json()
    return data
  }
})


return (
  <div>
    <Link className="bg-white my-10 w-[40%] h-10 font-semibold flex pl-3 items-center shadow-md hover:bg-gray-200 duration-700 text-blue-900" to='..'><FontAwesomeIcon to='tasks' icon={faArrowLeftLong} /></Link>
    <div className="bg-white shadow-md min-h-[300px] p-7">
      <h1 className="text-2xl font-bold mb-5 text-blue-900">Task Detail</h1>
      <h2 className="my-7 font-semibold">Task: {data && data.title}</h2>
      <h3>Description: {data && data.description}</h3>
      <p>Priority: {data && data.priority}</p>
      <p>Status: {data && data.status}</p>
      <h4>Created Date: {data && data.createdAt}</h4>
      <h4>Modified Date: {data && data.updatedAt}</h4>
    </div>
    </div>
  )
}

export default TasksDetail