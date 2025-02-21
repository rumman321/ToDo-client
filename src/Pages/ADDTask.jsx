import { compareAsc, format } from "date-fns";

const ADDTask = () => {
  const time = format(new Date(), "yyyy-MM-dd");
  
  const handleAdd = (e)=>{
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("title");
    const email = form.get("message");
    console.log(email,name);
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
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
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
            <button className="btn btn-primary">ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADDTask;
