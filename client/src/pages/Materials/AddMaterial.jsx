import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    setErrorState(validate(formState));
  }, [formState]);

  const resetAll = () => {
    setFormState({
      materialName: "",
      quantity: 0,
      minQuantity: 0,
      price: 0,
      unitMeasure: "",
      inUse: false,
      supplierName: "",
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      materialName: formState.materialName,
      quantity: formState.quantity,
      minQuantity: formState.minQuantity,
      price: formState.price,
      unitMeasure: formState.unitMeasure,
      inUse: formState.inUse,
      supplierName: formState.supplierName,
    };
    console.log(data);
    setErrorState(validate(formState));
    console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/materials/create", data)
        .then((response) => {
          console.log("Material created successfully");
          resetAll();
          navigate("/home/materials");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        });
    } else {
      console.log("Error while creating material");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.materialName) {
      errors.materialName = "Required!";
    }
    if (!values.quantity) {
      errors.quantity = "Required!";
    }
    if (!values.minQuantity) {
      errors.minQuantity = "Required!";
    }

    if (!values.unitMeasure) {
      errors.unitMeasure = "Required!";
    }
    if (!values.supplierName) {
      errors.supplierName = "Required!";
    }

    return errors;
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <ToastContainer />
      <div
        className="alert alert-primary d-flex align-items-center"
        role="alert"
      >
        <div>Note: You can't create material without following supplier!</div>
      </div>
      <form className="row g-3 w-50" onSubmit={submitForm}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Material name
            </label>
            <p className="form-label text-danger">{errorState.materialName}</p>
          </div>
          <input
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
              //checked={setRoleState === "ADMIN"}
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
              //checked={formState.role === "false"}
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMaterial;
