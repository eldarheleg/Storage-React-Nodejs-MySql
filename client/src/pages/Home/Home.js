import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="card m-5 text-center">
        <h5 className="card-header ">Welcome to the store management system</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <div className="d-flex flex-row mb-3 justify-content-around">
            <Link
              to={"/registration/admin"}
              className="p-2 btn btn-primary btn-block"
            >
              Registration
            </Link>

            <Link to={"/login"} className="p-2 btn btn-primary btn-block">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
