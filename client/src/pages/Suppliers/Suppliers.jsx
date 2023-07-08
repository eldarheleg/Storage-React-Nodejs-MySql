import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Supplires() {
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get("http://localhost:3001/api/suppliers", {})
      .then((response) => {
        setSuppliers(response.data.suppliers);
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
                <th>Name</th>
                <th>Email</th>
                <th>Contact person</th>
                <th>Phone number</th>
                <th className="text-center">Action</th>
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
                      <td className="text-center">
                        <Link
                          to={`update/` + supplier.id}
                          className="btn btn-success btn-sm w-50"
                        >
                          Edit
                        </Link>
                      </td>
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

export default Supplires;
