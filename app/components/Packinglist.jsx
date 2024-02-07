'use client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react';
import { AddItem } from '@/app/api/routes/plroute'

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setLoading] = useState(false); // New state for loading

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
    finally {
      // Set a timeout to delay the switch back
      setTimeout(() => {
        setLoading(false); // Stop loading after a delay
      }, 1000); // Delay of 2000 milliseconds (2 seconds)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='card mx-auto w-75 mt-5'>
        <div className='card-body'>
          <h1 className='d-flex justify-content-center'>Packing List</h1>
          <div className='d-flex justify-content-center'>
            <input
              className='form-control w-25'
              name='items'
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="Add a new item"
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
                      />
                      <button className='btn btn-success mx-2' type='button' onClick={() => applyEdit(task.id)}>Save</button>
                      <button className="btn btn-danger mx-2" type='button' onClick={() => setEdit(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                      <span className="me-auto">{task.text}</span> {/* Use me-auto to push buttons to the right */}
                      <button className="btn btn-warning btn-sm mx-2" type='button' onClick={() => startEdit(task)}>Edit</button>
                      <button className="btn btn-danger btn-sm mx-2" type='button' onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={isLoading}>
            {isLoading ? "Submitting..." : "Save"}
          </button>

        </div>
      </div>
    </form>
  );
};