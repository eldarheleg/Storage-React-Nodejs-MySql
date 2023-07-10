import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:3001/api/users/employees", {
        withCredentials: true,
      })
      .then((response) => {
        //console.log(response);
        setEmployees(response.data.employees);
        //setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrors(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="px-5 py-3 mt-3">
        <ToastContainer />
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Working status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>

                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.address}</td>
                    {employee.fired_date === null ? (
                      <td>Still working</td>
                    ) : (
                      new Date(employee.fired_date).toLocaleDateString("en", {
                        year: "numeric",
                        day: "2-digit",
                        month: "long",
                      })
                    )}
                    <td className="text-center">
                      <Link
                        to={`changepass/` + employee.id}
                        className="btn btn-success "
                      >
                        Change password
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employees;
