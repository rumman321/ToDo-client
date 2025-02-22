import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "../Component/TaskCard/TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading/Loading";

const Home = () => {
  const {user,loading} = useContext(AuthContext)
  console.log(user);
  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`,{headers:{email:user?.email}} ); //, {headers:{email:user?.email}} 
      return res.data;
    },
  });

  console.log("API URL:", import.meta.env.VITE_API_URL);

  // Initialize columns
  const [columns, setColumns] = useState({});

  useEffect(() => {
    // Group tasks by category
    const groupedTasks = {
      "To-Do": tasks.filter((task) => task.Category === "To-Do") || [],
      "In Progress": tasks.filter((task) => task.Category === "In Progress") || [],
      "Done": tasks.filter((task) => task.Category === "Done") || [],
    };

    console.log("Fetched Tasks from API:", tasks);
    console.log("Processed Columns:", groupedTasks);

    setColumns(groupedTasks);
  }, [tasks]);

  // Function to handle drag end
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside

    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory === destCategory) return; // No change

    // Get the dragged task
    const task = columns[sourceCategory][source.index];

    // Remove from source
    const newSourceTasks = [...columns[sourceCategory]];
    newSourceTasks.splice(source.index, 1);

    // Add to destination
    const updatedTask = { ...task, Category: destCategory };
    const newDestTasks = [...columns[destCategory]];
    newDestTasks.splice(destination.index, 0, updatedTask);

    // Update the state
    setColumns({
      ...columns,
      [sourceCategory]: newSourceTasks,
      [destCategory]: newDestTasks,
    });

    // Update the task category in the database
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
        title: task.title,
        message: task.message,
        category: destCategory, // Ensure full data is sent
      });
      refetch(); // Refresh data
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };
  if(isLoading) return <Loading></Loading>
  return (
    <div className="container mx-auto px-4 py-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(columns).map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-gray-100 rounded-lg">
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      category === "To-Do"
                        ? "text-blue-600"
                        : category === "In Progress"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {category}
                  </h2>
                  {columns[category]?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskCard key={task._id} refetch={refetch} task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
