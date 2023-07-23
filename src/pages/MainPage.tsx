import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-black font-montserrat text-xl">
      <div className="flex w-full items-center flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 bg-neutral-700 max-w-screen-lg">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
