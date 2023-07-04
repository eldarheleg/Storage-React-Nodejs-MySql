import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../../layout/Navigation";
import Employee from "../Employees/Employees";

function Home() {
  return (
    <>
      <Navigation />
    </>
  );
}

export default Home;
