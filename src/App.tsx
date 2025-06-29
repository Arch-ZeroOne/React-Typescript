import { useState, useRef, useEffect } from "react";
import { db } from "./firebase/config.ts";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.tsx";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

//setting the type for the state
//[] is incomplete so you will need to define the type of it like string[] . number[]
interface TaskItem {
  tasks: object[];
  setTask: object[];
}

interface Task {
  taskName: string;
  isCompleted: boolean;
  setLoading?: any;
  setTasks?: any;
  notifyDeletion?: any;
  notifyComplete?: any;
}

interface TaskCard {
  id: string;
  taskName: string;
  isCompleted: boolean;
  setLoading: any;
  setTasks: any;
  notifyDeletion: any;
  notifyComplete: any;
}

function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  //when we put the type at this <TaskItem> it refers to a single object
  //but when we defined it as like this <TaskItem[]> it now refers to an array of object
  const [tasks, setTasks] = useState<TaskItem[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const notifySuccess = () => {
    toast.success("Task  Added successfully");
    setLoading(false);
    getOrderedData(setTasks);
  };

  const notifyComplete = () => {
    toast.success("Task Completed");
    getOrderedData(setTasks);
  };
  const notifyDeletion = () => {
    toast.success("Deletion Successfull");
    getOrderedData(setTasks);
  };
  const notifyError = () => {
    toast.error("Task cannot be blank");
  };

  //runs on first render
  useEffect(() => {
    getOrderedData(setTasks);
  }, []);

  function handleAdd(e: any) {
    e.preventDefault();
    //Typescript checks if a value is null here so we  used ? in the current part
    //This line of code says that if current is not null return its value
    // (?) is put in the optional part (current) instead of the value
    const task = taskRef.current?.value;

    //handles blank task
    if (!task) {
      notifyError();
      return;
    }
    //payload for task details and status
    const payLoad = {
      taskName: task,
      isCompleted: false,
    };

    setLoading(true);
    addTask(payLoad, notifySuccess);
    getOrderedData(setTasks);
    //The left-hand side of an assignment expression may not be an optional property access occurs cause i am trying to use it in an object
    if (taskRef.current) {
      taskRef.current.value = "";
    }
  }

  return (
    <>
      <Toaster />
      {loading && <Loader />}
      {!loading && (
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
                    id={data.id}
                    key={data.id}
                    taskName={data.taskName}
                    isCompleted={data.isCompleted}
                    setLoading={setLoading}
                    setTasks={setTasks}
                    notifyDeletion={notifyDeletion}
                    notifyComplete={notifyComplete}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TaskCard({
  id,
  taskName,
  isCompleted,
  setLoading,
  notifyDeletion,
  notifyComplete,
}: TaskCard) {
  const handleUpdate = (task_id: string | number) => {
    setLoading(true);
    updateTask(task_id, notifyComplete, setLoading);
  };
  const handleDelete = (task_id: string | number) => {
    setLoading(true);
    removeTask(task_id, notifyDeletion, setLoading);
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title">
            {isCompleted ? (
              <del className="text-green-500 ">{taskName}</del>
            ) : (
              <p className="">{taskName}</p>
            )}
          </h2>

          <div className="justify-end card-actions">
            <button
              className="btn btn-success"
              title="Mark Done"
              onClick={() => handleUpdate(id)}
            >
              <i className="fa-solid fa-check  font-bold"></i>
            </button>
            <button
              className="btn btn-error"
              title="Delete Task"
              onClick={() => handleDelete(id)}
            >
              <i className="fa-solid fa-trash font-bold"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function addTask(task: Task, notifySuccess: any) {
  try {
    await addDoc(collection(db, "tasks"), {
      taskName: task.taskName,
      isCompleted: task.isCompleted,
      createdAt: serverTimestamp(),
    });

    notifySuccess();
  } catch (error) {
    console.log(error);
  }
}
async function removeTask(
  id: string | number,
  setLoading: any,
  notifyDeletion: any
) {
  const filter = doc(db, "tasks", String(id));
  const docRef = await getDoc(filter);

  if (docRef.exists()) {
    await deleteDoc(doc(db, "tasks", docRef.id));
    setLoading(false);
    notifyDeletion();
  }
}

async function updateTask(
  id: string | number,
  notifyComplete: any,
  setLoading: any
) {
  //queries and filter based on the id to get the result
  const filter = doc(db, "tasks", String(id));
  const docRef = await getDoc(filter);

  if (docRef.exists()) {
    await setDoc(doc(db, "tasks", docRef.id), {
      id: docRef.id,
      //marks the task completed
      isCompleted: true,
      taskName: docRef.data().taskName,
      createdAt: docRef.data().createdAt,
    });
    notifyComplete();
    setLoading(false);
  }
}

function getOrderedData(setTasks: any) {
  //creating reference from the database and the document name
  const taskRef = collection(db, "tasks");
  //query for ordering tasks based on a field
  const order = query(taskRef, orderBy("createdAt"));
  let data: object[] = [];
  let objectData: any = {};

  getDocs(order)
    .then((query) => {
      query.forEach((doc) => {
        //*Destructures the data
        const { taskName, isCompleted, createdAt } = doc.data();
        objectData.id = doc.id;
        objectData.taskName = taskName;
        objectData.isCompleted = isCompleted;
        objectData.createdAt = createdAt;

        data.push(objectData);
        setTasks(data);
        //reset every iteration
        objectData = {};
      });

      if (!data.length) {
        setTasks();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default App;
