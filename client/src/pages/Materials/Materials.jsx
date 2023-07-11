import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchMaterials();
    fetchSuppliers();
  }, []);

  const fetchMaterials = () => {
    axios
      .get("http://localhost:3001/api/materials")
      .then((response) => {
        setMaterials(response.data.materials);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchSuppliers = () => {
    axios
      .get("http://localhost:3001/api/suppliers")
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
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Minimum quantity</th>
                <th>Price</th>
                <th>Unit measure</th>
                <th>In use?</th>
                <th>Supplier</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.length === 0 ? (
                <tr>
                  <td className="m-2 fst-italic fs-5 text-start">
                    There's no materials yet
                  </td>
                </tr>
              ) : (
                materials.map((material) => {
                  return (
                    <tr key={material.id}>
                      <td>{material.id}</td>
                      <td>{material.materialName}</td>
                      <td>{material.quantity}</td>
                      <td>{material.minQuantity}</td>
                      <td>{material.price}</td>
                      <td>{material.unitMeasure}</td>
                      <td>{material.inUse === 0 ? "Yes" : "No"}</td>
                      {suppliers.map((supplier) => {
                        if (material.supplierId === supplier.id) {
                          return (
                            <td key={supplier.id}>{supplier.supplierName}</td>
                          );
                        } else {
                          return false;
                        }
                      })}
                      <td className="text-center">
                        <Link
                          to={`update/` + material.id}
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

export default Materials;
