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
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
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
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => startEdit(task)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
