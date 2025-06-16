import { useState, useRef, useEffect } from "react";
import { db } from "./firebase/config.ts";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

interface Task {
  taskName: string;
  createdAt: Date;
}

function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<[]>();

  function handleAdd(e: any) {
    e.preventDefault();
    const task = taskRef.current?.value;
    addTask(task);
    getAllTasks(setTasks);
    //The left-hand side of an assignment expression may not be an optional property access occurs cause i am trying to use it in an object
    if (taskRef.current) {
      taskRef.current.value = "";
    }
  }

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);
  return (
    <>
      <div className="font-[Poppins] flex flex-col h-full justify-center items-center gap-2 mt-10">
        <h1 className="text-center font-bold text-3xl text-blue-600">
          Task Manager
        </h1>
        <div className="w-full flex flex-col items-center justify-center gap">
          <form
            className="flex items-center gap-3 w-full justify-center"
            onSubmit={handleAdd}
          >
            <input
              type="text"
              placeholder="New Task"
              className="input input-primary"
              ref={taskRef}
            />
            <button className="btn btn-neutral">Add Task</button>
          </form>
          <div className="flex flex-col gap-3 mt-3">
            {tasks &&
              tasks.map((data) => (
                <TaskCard
                  taskName={data["taskName"]}
                  createdAt={data["createdAt"]}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

async function addTask(task: string | undefined) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      taskName: task,
      createdAt: serverTimestamp(),
    });

    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
}

function TaskCard({ taskName, createdAt }: Task) {
  return (
    <div>
      <div className="card w-96 bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{taskName}</h2>
          <p></p>
          <div className="justify-end card-actions">
            <button className="btn btn-success">Update Task</button>
            <button className="btn btn-error">Delete Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getAllTasks(setTasks: any) {
  const querySnapShot = await getDocs(collection(db, "tasks"));
  let data: object[] = [];
  querySnapShot.forEach((document) => {
    data.push(document.data());
  });

  setTasks(data);
}


//TODO: handle ordering of tasks by date
async function getOrderedData() {
  const taskRef = collection(db, "tasks");
  const q = query(taskRef),where("taskName","=="," ")

  const querySnapShot = await 
}

export default App;
