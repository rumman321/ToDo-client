import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { userNewCreate, setUser, upDateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleSubmit = () => {};
  return (
    <div>
      
    </div>
  );
};

export default Signup;
