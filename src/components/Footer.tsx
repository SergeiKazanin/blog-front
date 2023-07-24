import React from "react";

export default function Footer() {
  return (
    <footer className="h-12 flex w-full justify-center items-center bg-white">
      <span className="max-w-screen-lg">
        Developed by{" "}
        <a
          className="text-amber-500 hover:text-amber-600"
          href="https://github.com/SergeiKazanin"
          target="_blank"
          rel="noreferrer"
        >
          Sergei Kazanin
        </a>
      </span>
    </footer>
  );
}
