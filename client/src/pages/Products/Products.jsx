import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        setProducts(response.data.products);
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
                <th>Product Image</th>
                <th>Profit Margin</th>
                <th>Price</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td className="m-2 fst-italic fs-5 text-start">
                    There's no products yet
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.productName}</td>
                      <td>
                        <img
                          src={product.productImage}
                          className="img-thumbnail rounded-pill product"
                          alt="..."
                        />
                      </td>

                      <td>{product.profitMargin * 100 + "%"}</td>
                      <td>{product.productPrice.toFixed(2) + "$"}</td>

                      {/* <td className="text-center">
                        <Link
                          to={`update/` + material.id}
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

export default Products;
