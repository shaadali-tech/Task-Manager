import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
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

import { auth, db } from "../api/firebase";

function Dashboard() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ CREATE TASK
  const addTask = async () => {
    if (!task) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: task,
        uid: auth.currentUser.uid,
      });

      setTask("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ READ TASKS
  const fetchTasks = async () => {
    const q = query(
      collection(db, "tasks"),

      where("uid", "==", auth.currentUser.uid),
    );

    const querySnapshot = await getDocs(q);

    const taskList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(taskList);
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));

    fetchTasks();
  };

  // ✅ UPDATE TASK
  const updateTask = async () => {
    await updateDoc(doc(db, "tasks", editId), {
      title: task,
    });

    setTask("");

    setEditId(null);

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Task Dashboard</h1>
      {/* ✅ LOGOUT BUTTON */}
      <button onClick={handleLogout}>Logout</button>

      <hr />
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {editId ? (
        <button onClick={updateTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

      <hr />

      {tasks.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <button
            onClick={() => {
              setTask(item.title);

              setEditId(item.id);
            }}
          >
            Edit
          </button>

          <button onClick={() => deleteTask(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Dashboard;
