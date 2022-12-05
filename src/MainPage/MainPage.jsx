import React, { useEffect } from "react";
import NavBar from "../NavigationBar/NavBar";
import { FileExplorer } from "./FileExplorer";

const MainPage = () => {
  return (
    <div>
      <NavBar location="mainPage" />
      <FileExplorer />
    </div>
  );
};

export default MainPage;
