import React from 'react'
import { Button } from "../Components/ui/button"

const Todo = ({ id, title, description, isCompleted, mongoId, deleteTodo, completedTodo }) => {
    return (
        <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                {id + 1}
            </th>
            <td className={`px-6 py-4 text-center ${isCompleted ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 text-center ${isCompleted ? "line-through" : ""}`}>
                {description}
            </td>
            <td className="px-6 py-4 text-center">
                {isCompleted ? "Completed" : "Pending" }
            </td>
            <td className="px-6 py-4 text-center">
                <Button variant="destructive" onClick={()=>deleteTodo(mongoId)}>Delete</Button>
                {isCompleted ? "" : <Button className='bg-green-500 text-white px-4 py-2 ml-2' onClick={()=>completedTodo(mongoId)}>Done</Button>}
            </td>
        </tr>
    )
}

export default Todo