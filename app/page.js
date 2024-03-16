"use client"
import Todo from "@/Components/Todo.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('/api');
    setTodoData(response.data.data);
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({...form, [name]: value}));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api',formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
      })
      await fetchTodos();
    } catch (error) {
      toast.error('Error');
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', {
        params: {mongoId: id}
      });
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      toast.error('Error');
    }
  }

  const completedTodo = async (id) => {
    try {
      const response = await axios.put('/api',{},{
        params: {
          mongoId: id
        }
      });
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      toast.error('Error');
    }
  }

  return (
    <>
    <ToastContainer theme="dark"/>
      <form onSubmit={onSubmit} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input type="text" value={formData.title} onChange={onChangeHandler} name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea name="description" value={formData.description} onChange={onChangeHandler} placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add</button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-white-100 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
              {todoData.map((item, index) => {
                return <Todo key={index} id={index} title={item.title} description={item.description} isCompleted={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completedTodo={completedTodo}/>
              })}
          </tbody>
        </table>
      </div>



    </>
  );
}
