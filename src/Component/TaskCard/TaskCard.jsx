import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const TaskCard = ({ task, refetch }) => {
    console.log("alltask card",task);
  const { _id } = task;
  const [category,setCategory] = useState(task.Category)
  const handleUpdate=async(e)=>{
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title");
    const message = form.get("message");
    const updatedTask={
        title:title,
        message:message,
        category:category
    }

    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${_id}`, updatedTask)
    if (data.modifiedCount > 0) {
        refetch();
        Swal.fire("Updated!", "Task has been updated.", "success");
        document.getElementById(`edit-modal-${_id}`).close(); // Close modal
      }
  }
  const handleDelete = (id) => {
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
        axios
          .delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
          .then((res) => {
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
  };
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

        <h2 className="card-title text-xl font-bold  mt-2">{task.title}</h2>
        <p
          className="  line-clamp-1 overflow-hidden text-ellipsis  "
          title={task.message}
        >
          {task.message}
        </p>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm"  onClick={() => document.getElementById(`edit-modal-${_id}`).showModal()}>Edit</button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDelete(_id)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Modal for Editing Task */}
      <dialog id={`edit-modal-${_id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg" >Edit Task</h3>
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              //   onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Task Title"
              required
            />
            <textarea
              name="message"
              defaultValue={task.message}
              //   onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Task Description"
              required
            ></textarea>
            <select
              name="Category"
              defaultValue={task.Category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById(`edit-modal-${_id}`).close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TaskCard;
