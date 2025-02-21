import axios from "axios";
import Swal from "sweetalert2";

const TaskCard = ({ task,refetch }) => {
    const {_id} = task
    const handleDelete=(id)=>{
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
              axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`).then((res) => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                  refetch();
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Task has been deleted.",
                    icon: "success",
                  });
                }
              });
            }
          });
    }
  return (
    <div className="card w-full text-base-content shadow-lg border border-gray-200 p-4 rounded-lg mb-4">
      <div className="card-body">
        <div className="flex items-center text-center">
        <div
          className={`badge p-2 text-sm ${
            task.Category === "To-Do"
              ? "badge-info"
              : task.Category === "In Progress"
              ? "badge-warning"
              : "badge-success"
          }`}
        >
          {task.Category}
          
        </div>
        <p className="text-sm  ">📅 {task.time}</p>
        </div>
        

        <h2 className="card-title text-xl font-bold  mt-2">{task.tile}</h2>
        <p className="  line-clamp-1 overflow-hidden text-ellipsis  " title={task.message}>
          {task.message}
        </p>
        

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Edit</button>
          <button className="btn btn-error btn-sm" onClick={()=>handleDelete(_id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
