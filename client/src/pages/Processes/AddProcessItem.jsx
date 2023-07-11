import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProcessItem() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [errorState, setErrorState] = useState({});
  const [amount, setAmount] = useState(0);
  const [materialId, setMaterialId] = useState(0);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    axios
      .get("http://localhost:3001/api/materials")
      .then((response) => {
        //console.log(response.data.materials);
        setMaterials(response.data.materials);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setErrorState(validate({ amount, materialId }));
  }, [amount]);

  const resetAll = () => {
    setAmount(0);
    setMaterialId(0);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const isFound = materials.some((material) => {
      console.log(material.id, parseInt(materialId));
      if (material.id === parseInt(materialId)) {
        return true;
      }
      return false;
    });

    let data = {
      amount: amount,
      materialId: materialId,
    };
    //console.log(data);
    setErrorState(validate({ amount, materialId }));
    //console.log(errorState);
    if (Object.keys(errorState).length === 0 && isFound) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/processItems/create", data)
        .then((response) => {
          console.log("Item  created successfully");
          resetAll();
          navigate("/home/processes/processItems");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        });
    } else {
      console.log("Error while creating process item");
      toast.error("Material not found or error occured");
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
        </div>

        <div className="col-12 text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
            // disabled={Object.keys(errorState).length !== 0 ? true : false}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProcessItem;
