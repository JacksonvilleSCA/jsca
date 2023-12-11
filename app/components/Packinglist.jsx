'use client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react';
import {AddItem} from '@/app/api/routes/plroute'

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (!newTask) return; // Don't add empty tasks
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEdit = (task) => {
    setEdit(task.id);
    setEditText(task.text);
  };

  const applyEdit = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, text: editText } : task)));
    setEdit(null);
    setEditText('');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddItem({ items: tasks.map(task => task.text) }); // Pass the list of tasks
      setTasks([]); // Clear the list after saving
    } catch (error) {
      console.error("Error saving the list:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <h1 className='d-flex justify-content-center'>Packing List</h1>
      <div className='d-flex justify-content-center'>
        <input
          className='form-control w-25'
          name='items'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className='btn btn-primary ms-2' type='button' onClick={addTask}>Add</button>
      </div>
      <div className='d-flex justify-content-center m-auto'>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {edit === task.id ? (
                <div className='d-flex justify-content-center m-auto'>
                  <input
                    className='form-control w-auto'
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className='btn btn-success' onClick={() => applyEdit(task.id)}>Save</button>
                  <button className="btn btn-danger" onClick={() => setEdit(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  {task.text}
                  <button className="btn btn-warning" onClick={() => startEdit(task)}>Edit</button>
                  <button className="btn btn-danger mx-3 my-3" onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button type='submit' className='btn btn-primary'>submit</button>
    </div>
    </form>
  );
};