import { useState } from "react";

import { db } from "../api/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../api/firebase";

function Dashboard() {
  const [task, setTask] = useState("");

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        title: task,
      });

      alert("Task Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>

      <input
        type="text"
        placeholder="Task"
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
    </>
  );
}

export default Dashboard;
