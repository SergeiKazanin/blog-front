import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLazyRefreshQuery } from "../store/userApi";
import { useActions } from "../hooks/actions";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [refresh] = useLazyRefreshQuery();
  const { setIsAuth, userAdd } = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      refresh("")
        .unwrap()
        .then((userToken) => {
          if (userToken) {
            setIsAuth(true);
            userAdd(userToken);
            localStorage.setItem("accessToken", userToken.accessToken);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    navigate("posts");
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-black font-montserrat text-xl">
      <div className="flex flex-col items-center w-full min-h-screen">
        <Header />
        <div className="flex justify-center flex-1 w-full max-w-screen-lg">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
