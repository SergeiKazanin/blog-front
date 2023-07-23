import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuth, user } = useAppSelector((store) => store.posts);
  return (
    <header className="h-12 flex w-full justify-center shadow-sm items-center bg-white">
      <nav className="max-w-screen-lg w-full flex justify-between">
        <Link
          to={"/"}
          className="bg-slate-300 w-20 h-10 rounded-md flex items-center justify-center hover:bg-slate-400 text-3xl shadow-sm font-baebneue"
        >
          BLOG
        </Link>
        {!isAuth && (
          <div className="w-auto flex gap-6">
            <Link
              to={"login"}
              className="bg-cyan-200 w-28 h-10 rounded-md flex items-center justify-center hover:bg-cyan-400 text-2xl shadow-sm"
            >
              Login
            </Link>
            <Link
              to={"registration"}
              className="bg-teal-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-sm"
            >
              Registration
            </Link>
          </div>
        )}
        {isAuth && (
          <div className="w-auto flex gap-6">
            <Link to={"abotuser"}>{user.user.fullName}</Link>
            <Link
              to={"createpost"}
              className="bg-fuchsia-300 w-[180px] h-10 rounded-md flex items-center justify-center hover:bg-fuchsia-400 text-2xl shadow-sm"
            >
              Create post
            </Link>
            <Link
              to={"/auth/logout"}
              className="bg-yellow-200 w-[140px] h-10 rounded-md flex items-center justify-center hover:bg-yellow-400 text-2xl shadow-sm"
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
