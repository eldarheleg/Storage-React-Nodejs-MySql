import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSupplier() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    supplierName: "",
    jib: "",
    pib: "",
    phoneNumber: "",
    contactPerson: "",
    supplierEmail: "",
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
      supplierName: "",
      jib: "",
      pib: "",
      phoneNumber: "",
      contactPerson: "",
      supplierEmail: "",
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      supplierName: formState.supplierName,
      jib: formState.jib,
      pib: formState.pib,
      phoneNumber: formState.phoneNumber,
      contactPerson: formState.contactPerson,
      supplierEmail: formState.supplierEmail,
    };
    console.log(data);
    setErrorState(validate(formState));
    console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/suppliers/create", data)
        .then((response) => {
          console.log("Supplier created successfully");
          resetAll();
          navigate("/home/suppliers");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        });
    } else {
      console.log("Error while creating supplier");
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.supplierName) {
      errors.supplierName = "Required!";
    }
    if (!values.jib) {
      errors.jib = "Required!";
    } else if (values.jib.length > 13) {
      errors.jib = "13 characters or less";
    }
    if (!values.pib) {
      errors.pib = "Required!";
    } else if (values.pib.length > 12) {
      errors.pib = "12 characters or less";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Required!";
    }
    if (!values.contactPerson) {
      errors.contactPerson = "Required!";
    }
    if (!values.supplierEmail) {
      errors.supplierEmail = "Required!";
    } else if (!regex.test(values.supplierEmail)) {
      errors.supplierEmail = "Not a valid email format!";
    }

    return errors;
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <ToastContainer />
      <form className="row g-3 w-50" onSubmit={submitForm}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
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
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputEmail4" className="form-label">
              Jib
            </label>
            <p className="form-label text-danger">{errorState.jib}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="jib"
            placeholder="Jib"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputPassword4" className="form-label">
              Pib
            </label>
            <p className="form-label text-danger">{errorState.pib}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="pib"
            placeholder="Pib"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Phone number
            </label>
            <p className="form-label text-danger">{errorState.phoneNumber}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="phoneNumber"
            placeholder="Phone number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputAddress" className="form-label">
              Contact person
            </label>
            <p className="form-label text-danger">{errorState.contactPerson}</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="contactPerson"
            placeholder="Contact person name"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputAddress" className="form-label">
              Supplier email
            </label>
            <p className="form-label text-danger">{errorState.supplierEmail}</p>
          </div>
          <input
            type="email"
            className="form-control"
            name="supplierEmail"
            placeholder="Supplier email"
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

export default AddSupplier;
