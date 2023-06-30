import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";

function Employees() {
  const authState = useContext(AuthContext);

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img
              src="https://i.imgur.com/wvxPV9S.png"
              height="100"
              width="100"
              alt="user"
            />
          </button>
          <span className="name mt-3">{authState.username}</span>
          <span className="idd">@eleanorpena</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span>
              <i className="fa fa-copy"></i>
            </span>
          </div>
          <div className=" d-flex mt-2">
            <button className="btn1 btn-dark">Edit Employee</button>
          </div>
          <div className="text mt-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
