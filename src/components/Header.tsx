import { useAppSelector } from "../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/userApi";
import { useActions } from "../hooks/actions";

export default function Header() {
  const { isAuth, user } = useAppSelector((store) => store.posts);
  const [logout] = useLogoutMutation();
  const { setIsAuth, userDel } = useActions();
  const navigate = useNavigate();

  return (
    <header className="md:h-14 flex w-full justify-center shadow-md items-center bg-white">
      <nav className="max-w-screen-lg w-full md:py-0 py-3 gap-3 flex-col md:flex-row  px-6 flex justify-between items-center">
        <div className="flex justify-between w-full">
          <Link
            to={"/"}
            className="bg-slate-300 px-4 h-10 rounded-md flex items-center justify-center hover:bg-slate-400 text-3xl shadow-md font-baebneue"
          >
            BLOG
          </Link>
          {isAuth && (
            <Link
              to={"aboutuser"}
              className="flex items-center justify-center h-10 px-4 hover:underline shadow-md bg-slate-100"
            >
              {user.user.fullName}
            </Link>
          )}
        </div>

        {!isAuth && (
          <div className="flex md:flex-row flex-col gap-3 md:w-auto w-full items-start">
            <Link
              to={"login"}
              className="bg-cyan-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-cyan-400 text-2xl shadow-md"
            >
              Login
            </Link>
            <Link
              to={"registration"}
              className="bg-teal-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
            >
              Registration
            </Link>
          </div>
        )}
        {isAuth && (
          <div className="md:flex-row flex-col flex gap-3 md:w-auto w-full items-start">
            <Link
              to={"createpost"}
              className="bg-amber-200 whitespace-nowrap px-4 h-10 rounded-md flex items-center justify-center hover:bg-amber-400 text-2xl shadow-md"
            >
              Create post
            </Link>
            <button
              onClick={() => {
                logout("");
                localStorage.removeItem("accessToken");
                setIsAuth(false);
                userDel();
                navigate("/");
              }}
              className="bg-yellow-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-yellow-400 text-2xl shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
