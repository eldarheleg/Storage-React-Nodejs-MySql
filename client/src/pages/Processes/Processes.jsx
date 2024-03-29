import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Processes() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get("http://localhost:3001/api/processes")
      .then((response) => {
        setProcesses(response.data.processes);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="px-5 py-3 mt-3">
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Proces price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.length === 0 ? (
                <tr>
                  <td className="m-2 fst-italic fs-5 text-start">
                    There's no processes yet
                  </td>
                </tr>
              ) : (
                processes.map((process) => {
                  const sd = new Date(process.start_date).toLocaleString();
                  const ed = new Date(process.end_date).toLocaleString();
                  return (
                    <tr key={process.id}>
                      <td>{process.id}</td>
                      <td>{process.processName}</td>
                      <td>{sd}</td>
                      <td>{ed}</td>
                      <td>{process.processPrice + "$"}</td>
                      {/* <td className="text-center">
                    <Link
                      to={`update/` + supplier.id}
                      className="btn btn-success btn-sm w-50"
                    >
                      Edit
                    </Link>
                  </td> */}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Processes;
