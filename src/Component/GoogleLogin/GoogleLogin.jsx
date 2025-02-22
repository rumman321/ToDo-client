import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleGoogleSign = async () => {
  setLoading(true);
  try {
    const res = await googleSignIn();
    
    if (!res?.user?.email || !res?.user?.displayName) {
      throw new Error("Google sign-in did not return expected user data.");
    }

    const userInfo = {
      email: res.user.email,
      name: res.user.displayName,
      time: new Date(),
    };

    console.log("User Info before sending:", userInfo); // Debugging log
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
    navigate(navigate(location?.state ? location.state : "/"));
  } catch (error) {
    console.error("Google sign-in failed:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2 className="font-semibold text-center ">OR</h2>
      <div className="flex flex-col gap-5 mt-5">
        <button className="btn" onClick={handleGoogleSign} disabled={loading}>
          {loading ? (
            "Signing in..."
          ) : (
            <>
              <FcGoogle /> Login with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
