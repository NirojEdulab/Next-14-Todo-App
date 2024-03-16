import React from 'react'

const Todo = ({ id, title, description, isCompleted, mongoId, deleteTodo, completedTodo }) => {
    return (
        <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {id + 1}
            </th>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {description}
            </td>
            <td className="px-6 py-4">
                {isCompleted ? "Completed" : "Pending" }
            </td>
            <td className="px-6 py-4 flex gap-3">
                <button className='bg-red-500 text-white px-4 py-2' onClick={()=>deleteTodo(mongoId)}>Delete</button>
                {isCompleted ? "" : <button className='bg-green-500 text-white px-4 py-2' onClick={()=>completedTodo(mongoId)}>Done</button>}
            </td>
        </tr>
    )
}

export default Todo