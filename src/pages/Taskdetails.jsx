import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [task, setTask] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // ==================== GET SINGLE TASK ====================

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await api.tasks.get();

        const data = await response.json();

        if (response.ok) {
          const foundTask = data.find((item) => item._id === id);

          if (foundTask) {
            setTask(foundTask);
            setEditText(foundTask.text);
            setEditDescription(foundTask.description);
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log("Get Task Error:", error);
      }
    };

    if (isLoggedIn) {
      getTask();
    }
  }, [id, isLoggedIn]);

  // ==================== UPDATE TASK ====================

  const handleUpdate = async () => {
    if (editText.trim() === "" || editDescription.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.tasks.update(id, {
        text: editText.trim(),
        description: editDescription.trim(),
        completed: task.completed,
      });

      const data = await response.json();

      if (response.ok) {
        setTask(data.task);
        setEditText(data.task.text);
        setEditDescription(data.task.description);
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Update Task Error:", error);
    }
  };

  // ==================== DELETE TASK ====================

  const handleDelete = async () => {
    try {
      const response = await api.tasks.delete(id);

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Delete Task Error:", error);
    }
  };

  // ==================== LOADING ====================

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="task-detail-page">
      <div className="task-detail-card">
        {editMode ? (
          <>
            <h1>Update Task</h1>

            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="task-actions">
              <button type="button" onClick={handleUpdate}>
                Save
              </button>

              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{task.text}</h1>

            <p>{task.description}</p>

            <span className={task.completed ? "completed" : "pending"}>
              {task.completed ? "Completed" : "Pending"}
            </span>

            <div className="task-actions">
              <button type="button" onClick={() => setEditMode(true)}>
                ✏️
              </button>

              <button type="button" onClick={handleDelete}>
                🗑️
              </button>
            </div>

            <button type="button" onClick={() => navigate("/home")}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
