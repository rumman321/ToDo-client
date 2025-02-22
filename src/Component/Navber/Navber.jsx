import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdOutlineAddTask } from "react-icons/md";

const Navber = () => {
  const {user,logOut} = useContext(AuthContext)
  return (
    <div>
     <div className=" fixed z-20 navbar shadow-xl bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm font-bold dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" >Home</NavLink >
              </li>
              <li>
                <NavLink to="/addTask">ADD TASK</NavLink >
              </li>
              
            </ul>
          </div>
          <a className="font-bold inline-flex items-center text-xl "><MdOutlineAddTask /> TASK</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-bold menu-horizontal px-1">
          <li>
                <NavLink to="/" >Home</NavLink >
              </li>
              <li>
                <NavLink to="/addTask">ADD TASK</NavLink >
              </li>
              
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-3">
          
          {/* <img src={userIcon} alt="" /> */}
          {/* <div className=" ">
          {
            user && user?.email? <div className=" cursor-pointer tooltip" data-tip={user.displayName}>
              <img className="w-10 rounded-full"  src={user?.photoURL} alt="" />
              
            </div>
            :
            <img src={userIcon} alt="" />
          }
          
        </div>*/}
          {
          user  ?
           (<button onClick={logOut} className="btn btn-neutral btn-sm">Log Out</button>)
          :
          ( <Link to="/login" className="btn btn-neutral btn-sm">Login</Link >)
        } 
          
        </div>
      </div>
    </div>
  );
};

export default Navber;
