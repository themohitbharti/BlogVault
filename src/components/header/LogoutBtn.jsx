import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ className }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className={className || "inline-block px-6 py-2 duration-200 border-2 border-[#e85254] text-[#fabbbf] hover:bg-[#e85254] rounded-full mx-1"}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
