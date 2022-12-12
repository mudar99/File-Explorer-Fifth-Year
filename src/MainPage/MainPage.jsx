import React, { useEffect } from "react";
import NavBar from "../NavigationBar/NavBar";
import { FileExplorer } from "./FileExplorer";

const MainPage = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <NavBar location="mainPage" />
      <FileExplorer />
    </div>
  );
};

export default MainPage;
