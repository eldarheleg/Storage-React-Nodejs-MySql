import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMaterial() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    materialName: "",
    quantity: 0,
    minQuantity: 0,
    price: 0.0,
    unitMeasure: "",
    inUse: false,
    supplierName: "",
  });

  const [errorState, setErrorState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const { id } = useParams();
  async function fetchData() {
    axios
      .get(`http://localhost:3001/api/materials/${id}`)
      .then((res) => {
        axios
          .get(
            "http://localhost:3001/api/suppliers/" +
              res.data.material.supplierId
          )
          .then((response) => {
            setFormState({
              ...formState,
              materialName: res.data.material.materialName,
              quantity: res.data.material.quantity,
              minQuantity: res.data.material.minQuantity,
              price: res.data.material.price,
              unitMeasure: res.data.material.unitMeasure,
              inUse: res.data.material.inUse,
              supplierName: response.data.supplier.supplierName,
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    axios
      .patch(`http://localhost:3001/api/materials/update/${id}`, formState)
      .then((response) => {
        console.log(response);
        toast.success("Material updated successfull");
        navigate("/home/materials");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <ToastContainer />
      <h4>Edit Material</h4>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Material name
            </label>
            <p className="form-label text-danger">{errorState.materialName}</p>
          </div>
          <input
            value={formState.materialName}
            type="text"
            className="form-control"
            name="materialName"
            placeholder="Material name"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputEmail4" className="form-label">
              Quantity
            </label>
            <p className="form-label text-danger">{errorState.quantity}</p>
          </div>
          <input
            value={formState.quantity}
            type="number"
            className="form-control"
            name="quantity"
            placeholder="ex. 2000"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputPassword4" className="form-label">
              Minimum quantity at storage
            </label>
            <p className="form-label text-danger">{errorState.minQuantity}</p>
          </div>
          <input
            value={formState.minQuantity}
            type="number"
            className="form-control"
            name="minQuantity"
            placeholder="ex. 200"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Unit Measure
            </label>
            <p className="form-label text-danger">{errorState.unitMeasure}</p>
          </div>
          <input
            value={formState.unitMeasure}
            type="text"
            className="form-control"
            name="unitMeasure"
            placeholder="ex. kg"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Price per unit measure
            </label>
            <p className="form-label text-danger">{errorState.unitMeasure}</p>
          </div>
          <input
            value={formState.price}
            type="number"
            step="any"
            className="form-control"
            name="price"
            placeholder="ex. 15"
            onChange={handleChange}
          />
        </div>
        <div
          className="d-md-flex justify-content-start align-items-center my-3 py-2"
          name="role"
        >
          <h6 className="mb-0 me-4">In use: </h6>

          <div className="form-check form-check-inline mb-0 me-4">
            <input
              className="form-check-input"
              type="radio"
              value="true"
              name="inUse"
              defaultChecked={formState.inUse === true}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="femaleGender">
              Yes
            </label>
          </div>

          <div className="form-check form-check-inline mb-0 me-4">
            <input
              className="form-check-input"
              type="radio"
              value="false"
              name="inUse"
              defaultChecked={formState.inUse === false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="maleGender">
              No
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputAddress" className="form-label">
              Supplier name
            </label>
            <p className="form-label text-danger">{errorState.supplierName}</p>
          </div>
          <input
            value={formState.supplierName}
            type="text"
            className="form-control"
            name="supplierName"
            placeholder="Supplier name"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={Object.keys(errorState).length !== 0 ? true : false}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMaterial;
