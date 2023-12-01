'use client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react';

const TodoList = () => {
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

  return (
    <div>
        <h1>To-Do List</h1>
      <input
        className='form-control w-25'
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className='btn btn-primary mt-2' onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {edit === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => applyEdit(task.id)}>Save</button>
                <button onClick={() => setEdit(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                <button className="btn btn-danger mx-3 my-3" onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="btn btn-warning" onClick={() => startEdit(task)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
