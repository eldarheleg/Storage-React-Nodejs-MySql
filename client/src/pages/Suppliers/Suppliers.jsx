import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
//import { AuthContext } from "../helpers/AuthContext";
//import CustomCard from "../../components/CustomCard";
import axios from "axios";
import "./index.css";

function Supplires() {
  //const authState = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("token expired");
    } else {
      axios
        .get("http://localhost:3001/api/suppliers/", {
          //only if testing with api
          //   headers: {
          //     "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
          //   },
        })
        .then((response) => {
          console.log(response.data);
          setSuppliers(response.data.suppliers);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Suppliers List</h3>
      </div>
      <Link to="create" className="btn btn-success">
        Add Employee
      </Link>
      <Outlet/>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact person</th>
              <th>Phone number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td className="m-2 fst-italic fs-5 text-start">
                  There's no suppliers yet
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => {
                return (
                  <tr key={supplier.id}>
                    <td>{supplier.supplierName}</td>
                    
                    <td>{supplier.supplierEmail}</td>
                    <td>{supplier.contactPerson}</td>
                    <td>{supplier.phoneNumber}</td>
                    <td>
                      <Link
                        to={`/employeeEdit/` + supplier.id}
                        className="btn btn-primary btn-sm me-2"
                      >
                        edit
                      </Link>
                      <button className='btn btn-sm btn-danger'>delete</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
      </div>
    </div>
    
  );
}

export default Supplires;
