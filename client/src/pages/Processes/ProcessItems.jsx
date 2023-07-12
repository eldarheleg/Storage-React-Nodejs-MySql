import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function ProcessItems() {
  const [processItems, setProcessItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:3001/api/processItems")
      .then((response) => {
        console.log(response.data.processItems);
        setProcessItems(response.data.processItems);
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
                <th>Amount</th>
                <th>Unit Measure</th>
                <th>Material</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {processItems.length === 0 ? (
                <tr>
                  <td className="m-2 fst-italic fs-5 text-start">
                    There's no process item yet
                  </td>
                </tr>
              ) : (
                processItems.map((processItem) => {
                  return (
                    <tr key={processItem.id}>
                      <td>{processItem.id}</td>

                      <td>{processItem.amount}</td>
                      <td>{processItem.material.unitMeasure}</td>
                      <td>{processItem.material.materialName}</td>

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

export default ProcessItems;
