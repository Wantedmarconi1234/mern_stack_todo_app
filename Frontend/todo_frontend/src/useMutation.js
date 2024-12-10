// import { useMutation, useQueryClient } from "@tanstack/react-query";



// export const useMutation = () => {
//   return (
//     <div>
        
//     </div>
//   )
// }


// const queryClient = useQueryClient()

// export const deleteTask = useMutation({

//     mutationKey: ["Todos"],
//     mutationFn: async (id) => {
//       const response = await fetch(`http://localhost:3000/todo_app/todo/${id}`, {
//         method: "DELETE"
//       });
//       if (!response.ok) {
//         throw new Error("there was a network error")
//       }
//       return response.json()
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["Todos"])
//     }
//   })