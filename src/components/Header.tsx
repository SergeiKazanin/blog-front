import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../store/userApi";
import { useActions } from "../hooks/actions";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuth, user } = useAppSelector((store) => store.posts);
  const [logout] = useLogoutMutation();
  const { setIsAuth, userDel } = useActions();
  const navigate = useNavigate();

  return (
    <header className="sm:h-14 flex w-full justify-center shadow-md items-center bg-white">
      <nav className="max-w-screen-lg w-full h-full gap-3 flex-col sm:flex-row  p-6 flex justify-between items-center">
        <Link
          to={"/posts"}
          className="bg-slate-300 w-20 h-10 rounded-md flex items-center justify-center hover:bg-slate-400 text-3xl shadow-md font-baebneue"
        >
          BLOG
        </Link>
        {!isAuth && (
          <div className="w-auto flex sm:flex-row flex-col gap-6">
            <Link
              to={"login"}
              className="bg-cyan-200 w-28 h-10 rounded-md flex items-center justify-center hover:bg-cyan-400 text-2xl shadow-md"
            >
              Login
            </Link>
            <Link
              to={"registration"}
              className="bg-teal-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
            >
              Registration
            </Link>
          </div>
        )}
        {isAuth && (
          <div className="w-auto sm:flex-row flex-col flex gap-6">
            <Link
              to={"aboutuser"}
              className="flex items-center justify-center w-24 hover:underline shadow-md bg-slate-100"
            >
              {user.user.fullName}
            </Link>
            <Link
              to={"createpost"}
              className="bg-amber-200 w-[180px] h-10 rounded-md flex items-center justify-center hover:bg-amber-400 text-2xl shadow-md"
            >
              Create post
            </Link>
            <button
              onClick={() => {
                logout("");
                localStorage.removeItem("accessToken");
                setIsAuth(false);
                userDel();
                navigate("/posts");
              }}
              className="bg-yellow-200 w-[140px] h-10 rounded-md flex items-center justify-center hover:bg-yellow-400 text-2xl shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
