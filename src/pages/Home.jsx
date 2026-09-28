import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import api from "../api/api";

function Home() {
  const navigate = useNavigate();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  // ==================== GET TASKS ====================

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.tasks.get();

        const data = await response.json();

        if (response.ok) {
          setTasks(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Get Tasks Error:", error);
      }
    };

    if (isLoggedIn) {
      getTasks();
    }
  }, [isLoggedIn]);

  // ==================== ADD TASK ====================

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (task.trim() === "" || description.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.tasks.create({
        text: task.trim(),
        description: description.trim(),
      });

      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) => [data.task, ...prevTasks]);

        setTask("");
        setDescription("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Add Task Error:", error);
    }
  };

  // ==================== TOGGLE TASK ====================

  const handleToggleTask = async (taskId, completed) => {
    try {
      const currentTask = tasks.find((item) => item._id === taskId);

      const response = await api.tasks.update(taskId, {
        text: currentTask.text,
        description: currentTask.description,
        completed: !completed,
      });

      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((item) => (item._id === taskId ? data.task : item)),
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Toggle Task Error:", error);
    }
  };

  // ==================== DELETE TASK ====================

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await api.tasks.delete(taskId);

      const data = await response.json();

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((item) => item._id !== taskId),
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Delete Task Error:", error);
    }
  };

  // ==================== LOGIN CHECK ====================

  if (!user || !isLoggedIn) {
    return null;
  }

  const completedTasks = tasks.filter((item) => item.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div>
      <Header />

      <main className="home">
        <h1>Welcome, {user.name} 👋</h1>

        {/* ==================== STATS ==================== */}

        <div className="stats">
          <div>
            <h3>Total</h3>
            <p>{tasks.length}</p>
          </div>

          <div>
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>

          <div>
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
        </div>

        {/* ==================== ADD TASK FORM ==================== */}

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        {/* ==================== TASKS ==================== */}

        <div className="tasks">
          {tasks.map((item) => (
            <div className="task-card" key={item._id}>
              {/* COMPLETE BUTTON */}

              <button
                type="button"
                className="complete-btn"
                onClick={() => handleToggleTask(item._id, item.completed)}
              >
                {item.completed ? "✓" : "○"}
              </button>

              {/* TASK CONTENT */}

              <div
                className="task-content"
                onClick={() => navigate(`/task/${item._id}`)}
              >
                <h3>{item.text}</h3>

                <p className="task-description">{item.description}</p>

                <span className={item.completed ? "completed" : "pending"}>
                  {item.completed ? "Completed" : "Pending"}
                </span>
              </div>

              {/* DELETE BUTTON */}

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteTask(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
