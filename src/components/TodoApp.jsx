import { useState, useEffect } from "react";

function TodoApp() {

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    if (editId !== null) {

      setTasks(tasks.map(item =>
        item.id === editId
          ? { ...item, text: task, dueDate }
          : item
      ));

      setEditId(null);

    } else {

      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
        dueDate: dueDate
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const toggleTask = (id) => {

    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ));
  };

  const editTask = (item) => {
    setTask(item.text);
    setDueDate(item.dueDate || "");
    setEditId(item.id);
  };

  const filteredTasks = tasks.filter(item => {

    if (filter === "Completed") {
      return item.completed;
    }

    if (filter === "Pending") {
      return !item.completed;
    }

    return true;
  });

  const completedCount = tasks.filter(item => item.completed).length;

  return (

    <div className="todo-container">

      <div className="page-heading">
        <h1>My To-Do List ✅</h1>
        <p>Manage your daily activities efficiently.</p>
      </div>

      <div className="todo-stats">

        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{completedCount}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>{tasks.length - completedCount}</h2>
          <p>Pending</p>
        </div>

      </div>

      <div className="input-section">

        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>
          {editId !== null ? "Update Task" : "Add Task"}
        </button>

      </div>

      <div className="filter-section">

        {["All", "Pending", "Completed"].map(item => (

          <button
            key={item}
            className={filter === item ? "active-filter" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>

        ))}

      </div>

      <div className="task-list">

        {filteredTasks.length === 0 ? (

          <div className="empty-message">
            <h3>No tasks found! 🎯</h3>
            <p>Add a new task to get started.</p>
          </div>

        ) : (

          filteredTasks.map(item => (

            <div className="task-item" key={item.id}>

              <div className="task-info">

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <div>
                  <h3 className={item.completed ? "completed-task" : ""}>
                    {item.text}
                  </h3>

                  <p>
                    {item.dueDate
                      ? `Due: ${item.dueDate}`
                      : "No due date"}
                  </p>

                  <span className={item.completed ? "completed-status" : "pending-status"}>
                    {item.completed ? "Completed" : "Pending"}
                  </span>
                </div>

              </div>

              <div className="task-actions">

                <button onClick={() => editTask(item)}>
                  ✏️
                </button>

                <button onClick={() => deleteTask(item.id)}>
                  🗑️
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default TodoApp;