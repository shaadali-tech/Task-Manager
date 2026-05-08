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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !editId && addTask()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

            {editId ? (
              <button
                onClick={updateTask}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                onClick={addTask}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                No tasks yet. Create one to get started!
              </p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                  {item.title}
                </h3>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setTask(item.title);
                      setEditId(item.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
