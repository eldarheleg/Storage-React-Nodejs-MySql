import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    productName: "",
    productImage: "",
    price: 0.0,
    profitMargin: 0.0,
    processId: 0,
  });

  const [errorState, setErrorState] = useState({});
  const [found, setFound] = useState(false);
  const [process, setProcess] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    setErrorState(validate(formState));
    fetchProcess();
  }, [formState]);

  const resetAll = () => {
    setFormState({
      productName: "",
      productImage: "",
      price: 0.0,
      profitMargin: 0.0,
      processId: 0,
    });
  };

  const fetchProcess = async () => {
    let id = formState.processId;
    if (id) {
      axios

        .get("http://localhost:3001/api/processes/" + id)
        .then((response) => {
          //console.log(response.data.process);
          setProcess(response.data.process);
          setFound(true);
        })
        .catch((error) => {
          setFound(false);
          console.log(error.message);
        });
    } else {
      setFound(false);
      //console.log("id not set");
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      productName: formState.productName,
      productImage: formState.productImage,
      productPrice: formState.price,
      profitMargin: formState.profitMargin,
      processId: process.id || formState.processId,
    };
    //console.log(data);
    setErrorState(validate(formState));
    //console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/products/create", data)
        .then((response) => {
          console.log("Product successfully added");
          resetAll();
          navigate("/home/products");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error("Process not found or error occured");
          } else {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
          }
        });
    } else {
      console.log("Error while creating Product");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.productName) {
      errors.productName = "Required!";
    }
    if (!values.productImage) {
      errors.productImage = "Required!";
    }
    if (!values.profitMargin) {
      errors.profitMargin = "Required!";
    }
    if (!values.price) {
      errors.price = "Required!";
    }
    if (!values.processId) {
      errors.processId = "Required!";
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
        <div>
          Note: You can't create product without following production process!
        </div>
      </div>
      <form className="row g-3 w-50" onSubmit={submitForm}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Product name
            </label>
            <p className="form-label text-danger">{errorState.productName}</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="productName"
            placeholder="Product name"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputEmail4" className="form-label">
              Product Image
            </label>
            <p className="form-label text-danger">{errorState.productImage}</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="productImage"
            placeholder="ex. www.google.com/img1.jpg"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Profit Margin
            </label>
            <p className="form-label text-danger">{errorState.profitMargin}</p>
          </div>
          <input
            type="number"
            step="any"
            className="form-control"
            name="profitMargin"
            placeholder="0.01 and above"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Price
            </label>
            <p className="form-label text-danger">{errorState.price}</p>
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
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputSalary" className="form-label">
              Process ID
            </label>
            <p className="form-label text-danger">{errorState.processId}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="processId"
            placeholder="ex. 1"
            onChange={handleChange}
          />
          {found ? (
            <p className="form-label text-info">
              Process name: {process.processName}
            </p>
          ) : (
            <p className="form-label text-danger">Process not found</p>
          )}
        </div>

        <div className="col-12 text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={
              Object.keys(errorState).length !== 0 && !found ? true : false
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
