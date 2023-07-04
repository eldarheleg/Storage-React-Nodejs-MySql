import { useContext, useEffect,useState } from "react";
//import { AuthContext } from "../helpers/AuthContext";
//import CustomCard from "../../components/CustomCard";
import axios from "axios";
import "./index.css";

function Employees() {
  //const authState = useContext(AuthContext);
  const [employees, setEmployees] = useState([])

  // useEffect(() => {
  //   fetchEmployees();
  // },[]);

  // const fetchEmployees = () => {
  //   axios
  //     .get("http://localhost:3001/api/users/employees", {
  //       headers: {
  //         "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     .then((response) => {
  //       setEmployees(response.data);
  //     });
  // };

  return (
    <div className="container-fluid mx-3">
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
