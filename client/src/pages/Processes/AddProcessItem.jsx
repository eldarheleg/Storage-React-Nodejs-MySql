import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProcessItem() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState({});
  const [errorState, setErrorState] = useState({});
  const [amount, setAmount] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    fetchMaterial();
  }, [amount, materialId]);

  const fetchMaterial = () => {
    let id = materialId;
    if (id) {
      axios
        .get("http://localhost:3001/api/materials/" + id)
        .then((response) => {
          //console.log(response.data.material);
          setMaterial(response.data.material);
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

  useEffect(() => {
    setErrorState(validate({ amount, materialId }));
  }, [amount, materialId]);

  const resetAll = () => {
    setAmount(0);
    setMaterialId(0);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    let data = {
      amount: amount,
      materialId: materialId,
    };
    //console.log(data);
    setErrorState(validate({ amount, materialId }));
    //console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/processItems/create", data)
        .then((response) => {
          console.log("Item  created successfully");
          resetAll();
          navigate("/home/processes/processItems");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error("Material not found or error occured");
          } else {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
          }
        });
    } else {
      console.log("Error while creating process item");
      toast.error("Error while creating process item");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = "Required!";
    }
    if (!values.materialId) {
      errors.materialId = "Required!";
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
              Amount
            </label>
            <p className="form-label text-danger">{errorState.amount}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="amount"
            placeholder="ex. 2000"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Material by Id
            </label>
            <p className="form-label text-danger">{errorState.materialId}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="materialId"
            placeholder="ex. 1"
            onChange={(e) => setMaterialId(e.target.value)}
          />
          {found ? (
            <p className="form-label text-info">
              Material name: {material.materialName}
            </p>
          ) : (
            <p className="form-label text-danger">Material not found</p>
          )}
        </div>

        <div className="col-12 text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={
              Object.keys(errorState).length !== 0 && found === false
                ? true
                : false
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProcessItem;
