import { useState, useRef, useEffect } from "react";
import { db } from "./firebase/config.ts";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

interface Task {
  taskName: string;
  createdAt: Date;
}

//setting the type for the state
//[] is incomplete so you will need to define the type of it like string[] . number[]
interface TaskItem {
  tasks: object[];
  setTask: object[];
}

function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  //when we put the type at this <TaskItem> it refers to a single object
  //but when we defined it as like this <TaskItem[]> it now refers to an array of object
  const [tasks, setTasks] = useState<TaskItem[]>();

  useEffect(() => {
    getOrderedData(setTasks);
  }, []);

  function handleAdd(e: any) {
    e.preventDefault();
    //Typescript checks if a value is null here so we  used ? in the current part
    //This line of code says that if current is not null return its value
    // (?) is put in the optional part (current) instead of the value
    const task = taskRef.current?.value;
    addTask(task);
    getOrderedData(setTasks);
    //The left-hand side of an assignment expression may not be an optional property access occurs cause i am trying to use it in an object
    if (taskRef.current) {
      taskRef.current.value = "";
    }
  }

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
              tasks.map((data: any) => (
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

//TODO: handle ordering of tasks by date
function getOrderedData(setTasks: any) {
  //creating reference from the database and the document name
  const taskRef = collection(db, "tasks");
  //query for ordering tasks based on a field
  const order = query(taskRef, orderBy("createdAt"));
  let data: object[] = [];
  getDocs(order)
    .then((query) => {
      query.forEach((doc) => {
        console.log(doc.data());
        data.push(doc.data());
        setTasks(data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default App;
