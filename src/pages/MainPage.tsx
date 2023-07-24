import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLazyRefreshQuery } from "../store/userApi";
import { useActions } from "../hooks/actions";

export default function MainPage() {
  const [refresh] = useLazyRefreshQuery();
  const { setIsAuth, userAdd } = useActions();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      refresh("")
        .unwrap()
        .then((userToken) => {
          if (userToken) {
            console.log(userToken);
            setIsAuth(true);
            userAdd(userToken);
            localStorage.setItem("accessToken", userToken.accessToken);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-black font-montserrat text-xl">
      <div className="flex w-full items-center flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 max-w-screen-lg">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
