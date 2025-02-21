import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Signup = () => {
  const { userNewCreate, setUser, upDateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    try {
        // Create user in Firebase
        const result = await userNewCreate(email, password);
        console.log(result.user); // Initially, displayName is null

        // ✅ Wait for profile update to complete
        await upDateUserProfile(name);

        // ✅ Manually update user object in state
        const updatedUser = { ...result.user, displayName: name };
        setUser(updatedUser);

        // ✅ Create user data with the correct name
        const userData = {
            name: name,  // Directly use `name` instead of `result.user.displayName`
            email: result?.user?.email,
            time: new Date(),
        };

        console.log(userData);

        // Send user data to backend
        const { data } = await axios.post('http://localhost:5000/users', userData);
        console.log(data);

        navigate("/");
    } catch (err) {
        console.log(err);
       
    }
};

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-lg p-10 shrink-0 shadow-2xl">
        <h2 className="font-bold text-2xl text-center">
          Sign up your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          {/* {error.name && <label className="label text-red-600">{error.name}</label>} */}
          {/* pore korbo photo er kaj */}
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo url"
              className="input input-bordered"
              required
            />
          </div> */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />

            {error.pass && (
              <label className="label text-red-600 text-sm">{error.pass}</label>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign up</button>
          </div>
        </form>
        <br />
        {/* <GoogleLogin></GoogleLogin> */}
        <p className="text-center font-semibold">
          Already have an account ?{" "}
          <Link className="text-red-600" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
