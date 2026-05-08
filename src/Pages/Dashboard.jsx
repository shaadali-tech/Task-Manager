import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../api/firebase";

function Dashboard() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // CREATE TASK
  const addTask = async () => {
    if (!task) {
      toast.error("Task cannot be empty");

      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error("Not authenticated");
        navigate("/");
        return;
      }

      await addDoc(collection(db, "tasks"), {
        title: task,

        uid: user.uid,
      });

      toast.success("Task Added");

      setTask("");

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  // READ TASKS
  const fetchTasks = async () => {
    const user = auth.currentUser;

    if (!user) {
      setTasks([]);
      return;
    }

    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    const taskList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(taskList);
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));

    toast.success("Task deleted successfully");
    fetchTasks();
  };

  // UPDATE TASK
  const updateTask = async () => {
    setLoading(true);

    await updateDoc(doc(db, "tasks", editId), {
      title: task,
    });

    setTask("");

    setEditId(null);

    toast.success("Task updated successfully");
    fetchTasks();
    setLoading(false);
  };

  useEffect(() => {
    // Re-run fetch when auth state changes (user signed in/out)
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) fetchTasks();
      else setTasks([]);
    });

    // Initial attempt (in case user is already available)
    if (auth.currentUser) fetchTasks();

    return () => unsub();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-max-width">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p>Manage your tasks efficiently</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>

        {/* Add Task Section */}
        <div className="add-task-section">
          <label>Add New Task</label>
          <div className="task-input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !editId && addTask()}
            />

            {editId ? (
              <button
                onClick={updateTask}
                disabled={loading}
                className="btn-update"
              >
                {loading ? "Updating..." : "Update Task"}
              </button>
            ) : (
              <button onClick={addTask} disabled={loading} className="btn-add">
                {loading ? "Adding..." : "Add Task"}
              </button>
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <p>No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <>
              <p className="task-counter">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"} to
                complete
              </p>
              {tasks.map((item) => (
                <div key={item.id} className="task-item">
                  <h3>{item.title}</h3>

                  <div className="task-actions">
                    <button
                      onClick={() => {
                        setTask(item.title);
                        setEditId(item.id);
                      }}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(item.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
