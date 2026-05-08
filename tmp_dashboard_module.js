import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/Pages/Dashboard.jsx");const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport7_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=21e11951";
import { signOut } from "/node_modules/.vite/deps/firebase_auth.js?v=21e11951";
import toast from "/node_modules/.vite/deps/react-hot-toast.js?v=21e11951";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "/node_modules/.vite/deps/firebase_firestore.js?v=21e11951";
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=21e11951";
import { onAuthStateChanged } from "/node_modules/.vite/deps/firebase_auth.js?v=21e11951";
import { auth, db } from "/src/api/firebase.js";
var _jsxFileName = "C:/Users/Shaad Ali/react/Projects/react-lms/Task-MAnager/src/Pages/Dashboard.jsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=21e11951";
var _s = $RefreshSig$();
function Dashboard() {
	_s();
	const navigate = useNavigate();
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editId, setEditId] = useState(null);
	// â LOGOUT
	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success("Logged out successfully");
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};
	// â CREATE TASK
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
				uid: user.uid
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
	// â READ TASKS
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
			...doc.data()
		}));
		setTasks(taskList);
	};
	// â DELETE TASK
	const deleteTask = async (id) => {
		await deleteDoc(doc(db, "tasks", id));
		toast.success("Task deleted successfully");
		fetchTasks();
	};
	// â UPDATE TASK
	const updateTask = async () => {
		setLoading(true);
		await updateDoc(doc(db, "tasks", editId), { title: task });
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
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
		/* @__PURE__ */ _jsxDEV("h1", {
			className: "text-2xl font-bold",
			children: " Task Dashboard"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 141,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("button", {
			onClick: handleLogout,
			children: "Logout"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 143,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("hr", {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ _jsxDEV("input", {
			type: "text",
			placeholder: "Enter Task",
			value: task,
			onChange: (e) => setTask(e.target.value)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 7
		}, this),
		editId ? /* @__PURE__ */ _jsxDEV("button", {
			onClick: updateTask,
			disabled: loading,
			children: loading ? "Updating..." : "Update Task"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 154,
			columnNumber: 9
		}, this) : /* @__PURE__ */ _jsxDEV("button", {
			onClick: addTask,
			disabled: loading,
			children: loading ? "Adding..." : "Add Task"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 158,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ _jsxDEV("hr", {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 163,
			columnNumber: 7
		}, this),
		tasks.map((item) => /* @__PURE__ */ _jsxDEV("div", { children: [
			/* @__PURE__ */ _jsxDEV("h3", { children: item.title }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("button", {
				onClick: () => {
					setTask(item.title);
					setEditId(item.id);
				},
				children: "Edit"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("p", { children: loading ? "Loading..." : "" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("button", {
				onClick: () => deleteTask(item.id),
				children: "Delete"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 11
			}, this)
		] }, item.id, true, {
			fileName: _jsxFileName,
			lineNumber: 166,
			columnNumber: 9
		}, this))
	] }, void 0, true);
}
_s(Dashboard, "EEDkaraTmDfYaBc2BxKjs/FwZM8=", false, function() {
	return [useNavigate];
});
_c = Dashboard;
export default Dashboard;
var _c;
$RefreshReg$(_c, "Dashboard");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/Pages/Dashboard.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Shaad Ali/react/Projects/react-lms/Task-MAnager/src/Pages/Dashboard.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/Shaad Ali/react/Projects/react-lms/Task-MAnager/src/Pages/Dashboard.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/Shaad Ali/react/Projects/react-lms/Task-MAnager/src/Pages/Dashboard.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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RCxTQUNDLHdCQUFDLFVBQUQ7R0FBUSxTQUFTO0dBQVksVUFBVTthQUNwQyxVQUFVLGdCQUFnQjtHQUNwQjs7OzthQUVULHdCQUFDLFVBQUQ7R0FBUSxTQUFTO0dBQVMsVUFBVTthQUNqQyxVQUFVLGNBQWM7R0FDbEI7Ozs7O0VBR1gsd0JBQUMsTUFBRCxFQUFNOzs7OztFQUVMLE1BQU0sS0FBSyxTQUNWLHdCQUFDLE9BQUQ7R0FDRSx3QkFBQyxNQUFELFlBQUssS0FBSyxPQUFXOzs7OztHQUVyQix3QkFBQyxVQUFEO0lBQ0UsZUFBZTtLQUNiLFFBQVEsS0FBSyxNQUFNO0tBRW5CLFVBQVUsS0FBSyxHQUFHOztjQUVyQjtJQUVROzs7OztHQUNULHdCQUFDLEtBQUQsWUFBSSxVQUFVLGVBQWUsSUFBTzs7Ozs7R0FDcEMsd0JBQUMsVUFBRDtJQUFRLGVBQWUsV0FBVyxLQUFLLEdBQUc7Y0FBRTtJQUFlOzs7OztHQUN2RCxJQWRJLEtBQUs7Ozs7VUFjVCxDQUNOO0VBQ0Q7Ozs7RUFFTjs7QUFFRCxlQUFlIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkRhc2hib2FyZC5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzaWduT3V0IH0gZnJvbSBcImZpcmViYXNlL2F1dGhcIjtcclxuaW1wb3J0IHRvYXN0IGZyb20gXCJyZWFjdC1ob3QtdG9hc3RcIjtcclxuaW1wb3J0IHtcclxuICBjb2xsZWN0aW9uLFxyXG4gIGFkZERvYyxcclxuICBnZXREb2NzLFxyXG4gIGRlbGV0ZURvYyxcclxuICBkb2MsXHJcbiAgdXBkYXRlRG9jLFxyXG4gIHF1ZXJ5LFxyXG4gIHdoZXJlLFxyXG59IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcclxuXHJcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHsgb25BdXRoU3RhdGVDaGFuZ2VkIH0gZnJvbSBcImZpcmViYXNlL2F1dGhcIjtcclxuXHJcbmltcG9ydCB7IGF1dGgsIGRiIH0gZnJvbSBcIi4uL2FwaS9maXJlYmFzZVwiO1xyXG5cclxuZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICBjb25zdCBbdGFzaywgc2V0VGFza10gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgW3Rhc2tzLCBzZXRUYXNrc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlZGl0SWQsIHNldEVkaXRJZF0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgLy8g4pyFIExPR09VVFxyXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHNpZ25PdXQoYXV0aCk7XHJcblxyXG4gICAgICB0b2FzdC5zdWNjZXNzKFwiTG9nZ2VkIG91dCBzdWNjZXNzZnVsbHlcIik7XHJcblxyXG4gICAgICBuYXZpZ2F0ZShcIi9cIik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyDinIUgQ1JFQVRFIFRBU0tcclxuICBjb25zdCBhZGRUYXNrID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCF0YXNrKSB7XHJcbiAgICAgIHRvYXN0LmVycm9yKFwiVGFzayBjYW5ub3QgYmUgZW1wdHlcIik7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXV0aC5jdXJyZW50VXNlcjtcclxuXHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHRvYXN0LmVycm9yKFwiTm90IGF1dGhlbnRpY2F0ZWRcIik7XHJcbiAgICAgICAgbmF2aWdhdGUoXCIvXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXdhaXQgYWRkRG9jKGNvbGxlY3Rpb24oZGIsIFwidGFza3NcIiksIHtcclxuICAgICAgICB0aXRsZTogdGFzayxcclxuXHJcbiAgICAgICAgdWlkOiB1c2VyLnVpZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0b2FzdC5zdWNjZXNzKFwiVGFzayBBZGRlZFwiKTtcclxuXHJcbiAgICAgIHNldFRhc2soXCJcIik7XHJcblxyXG4gICAgICBmZXRjaFRhc2tzKCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcblxyXG4gICAgICB0b2FzdC5lcnJvcihcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIOKchSBSRUFEIFRBU0tTXHJcbiAgY29uc3QgZmV0Y2hUYXNrcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICBzZXRUYXNrcyhbXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxID0gcXVlcnkoY29sbGVjdGlvbihkYiwgXCJ0YXNrc1wiKSwgd2hlcmUoXCJ1aWRcIiwgXCI9PVwiLCB1c2VyLnVpZCkpO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpO1xyXG5cclxuICAgIGNvbnN0IHRhc2tMaXN0ID0gcXVlcnlTbmFwc2hvdC5kb2NzLm1hcCgoZG9jKSA9PiAoe1xyXG4gICAgICBpZDogZG9jLmlkLFxyXG4gICAgICAuLi5kb2MuZGF0YSgpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHNldFRhc2tzKHRhc2tMaXN0KTtcclxuICB9O1xyXG5cclxuICAvLyDinIUgREVMRVRFIFRBU0tcclxuICBjb25zdCBkZWxldGVUYXNrID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgICBhd2FpdCBkZWxldGVEb2MoZG9jKGRiLCBcInRhc2tzXCIsIGlkKSk7XHJcblxyXG4gICAgdG9hc3Quc3VjY2VzcyhcIlRhc2sgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICBmZXRjaFRhc2tzKCk7XHJcbiAgfTtcclxuXHJcbiAgLy8g4pyFIFVQREFURSBUQVNLXHJcbiAgY29uc3QgdXBkYXRlVGFzayA9IGFzeW5jICgpID0+IHtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgYXdhaXQgdXBkYXRlRG9jKGRvYyhkYiwgXCJ0YXNrc1wiLCBlZGl0SWQpLCB7XHJcbiAgICAgIHRpdGxlOiB0YXNrLFxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGFzayhcIlwiKTtcclxuXHJcbiAgICBzZXRFZGl0SWQobnVsbCk7XHJcblxyXG4gICAgdG9hc3Quc3VjY2VzcyhcIlRhc2sgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICBmZXRjaFRhc2tzKCk7XHJcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gUmUtcnVuIGZldGNoIHdoZW4gYXV0aCBzdGF0ZSBjaGFuZ2VzICh1c2VyIHNpZ25lZCBpbi9vdXQpXHJcbiAgICBjb25zdCB1bnN1YiA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCAodSkgPT4ge1xyXG4gICAgICBpZiAodSkgZmV0Y2hUYXNrcygpO1xyXG4gICAgICBlbHNlIHNldFRhc2tzKFtdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWwgYXR0ZW1wdCAoaW4gY2FzZSB1c2VyIGlzIGFscmVhZHkgYXZhaWxhYmxlKVxyXG4gICAgaWYgKGF1dGguY3VycmVudFVzZXIpIGZldGNoVGFza3MoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkXCI+IFRhc2sgRGFzaGJvYXJkPC9oMT5cclxuICAgICAgey8qIOKchSBMT0dPVVQgQlVUVE9OICovfVxyXG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH0+TG9nb3V0PC9idXR0b24+XHJcblxyXG4gICAgICA8aHIgLz5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgVGFza1wiXHJcbiAgICAgICAgdmFsdWU9e3Rhc2t9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUYXNrKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtlZGl0SWQgPyAoXHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt1cGRhdGVUYXNrfSBkaXNhYmxlZD17bG9hZGluZ30+XHJcbiAgICAgICAgICB7bG9hZGluZyA/IFwiVXBkYXRpbmcuLi5cIiA6IFwiVXBkYXRlIFRhc2tcIn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2FkZFRhc2t9IGRpc2FibGVkPXtsb2FkaW5nfT5cclxuICAgICAgICAgIHtsb2FkaW5nID8gXCJBZGRpbmcuLi5cIiA6IFwiQWRkIFRhc2tcIn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxociAvPlxyXG5cclxuICAgICAge3Rhc2tzLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtpdGVtLmlkfT5cclxuICAgICAgICAgIDxoMz57aXRlbS50aXRsZX08L2gzPlxyXG5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNldFRhc2soaXRlbS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICAgIHNldEVkaXRJZChpdGVtLmlkKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgRWRpdFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8cD57bG9hZGluZyA/IFwiTG9hZGluZy4uLlwiIDogXCJcIn08L3A+XHJcbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGRlbGV0ZVRhc2soaXRlbS5pZCl9PkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcclxuIl19
