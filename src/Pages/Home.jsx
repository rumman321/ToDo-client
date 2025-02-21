import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "../Component/TaskCard/TaskCard";

const Home = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Task"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      return res.data;
    },
  });
    // Group tasks by category
    const toDoTasks = tasks.filter((task) => task.Category === "To-Do");
    const inProgressTasks = tasks.filter((task) => task.Category === "In Progress");
    const doneTasks = tasks.filter((task) => task.Category === "Done");

  return (
    <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* To-Do Column */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-4">To-Do</h2>
        {toDoTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {/* In Progress Column */}
      <div>
        <h2 className="text-xl font-bold text-yellow-600 mb-4">In Progress</h2>
        {inProgressTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {/* Done Column */}
      <div>
        <h2 className="text-xl font-bold text-green-600 mb-4">Done</h2>
        {doneTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default Home;
