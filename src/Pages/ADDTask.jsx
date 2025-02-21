import axios from "axios";
import { compareAsc, format } from "date-fns";
import { useState } from "react";
import ButtonLoading from "../Component/ButtonLoading/ButtonLoading";
import { useNavigate } from "react-router-dom";

const ADDTask = () => {
    const [Category,setCategory]= useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  const time = format(new Date(), "yyyy-MM-dd");
  
  const handleAdd = async(e)=>{
    setLoading(true)
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title");
    const message = form.get("message");
    
    const taskData={
        tile:title,
        message:message,
        time:time,
        Category:Category
    }
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData);
        console.log(data);
        if(data.insertedId){
            // form.reset()
            
            e.target.reset();
            navigate('/')
            
        }
        setLoading(false)
  }
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <form className="card-body" onSubmit={handleAdd}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">TITLE</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <select
              className="select select-bordered"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Type Message"
              name="message"
              required
              className="textarea textarea-bordered w-full mb-4"
            ></textarea>
            
          </div>
          <div className="form-control mt-6">
            {
                loading ? <ButtonLoading></ButtonLoading>:<button className="btn btn-primary">ADD</button>
            }
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADDTask;
