import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

function AddProcess() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorState, setErrorState] = useState({});
  const [procesItem, setProcessItem] = useState({});
  const [found, setFound] = useState(false);
  const [formState, setFormState] = useState({
    processName: "",
    end_date: endDate || "",
    start_date: startDate || "",
    processItemId: 0,
    procesItem: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    setErrorState(validate(formState));
    fetchItem();
  }, [formState]);

  const resetAll = () => {
    setFormState({
      processName: "",
      end_date: "",
      start_date: "",
      processItemId: 0,
    });
  };

  const fetchItem = () => {
    let id = formState.processItemId;
    if (id) {
      axios

        .get(
          "http://localhost:3001/api/processItems/" + formState.processItemId
        )
        .then((response) => {
          //console.log(response.data.processItem);
          setProcessItem(response.data.processItem);
          setFound(true);
        })
        .catch((error) => {
          console.log(error.message);
          setFound(false);
        });
    } else {
      setFound(false);
      //console.log("id not set");
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      processName: formState.processName,
      end_date: endDate.toLocaleDateString(),
      start_date: startDate.toLocaleDateString(),
      processItemId: formState.processItemId,
      processItem: procesItem,
    };
    //console.log(data);
    setErrorState(validate(formState));
    //console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/processes/create", data)
        .then((response) => {
          //console.log(response);
          resetAll();
          navigate("/home/processes");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error("Process item not found or error occured");
          } else {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
          }
        });
    } else {
      console.log("Error while creating supplier");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.processName) {
      errors.processName = "Required!";
    }
    if (!values.processItemId) {
      errors.processItemId = "Required!";
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
              Process name
            </label>
            <p className="form-label text-danger">{errorState.processName}</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="processName"
            placeholder="Process name"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Proces item ID
            </label>
            <p className="form-label text-danger">{errorState.processItemId}</p>
          </div>
          <input
            type="number"
            className="form-control"
            name="processItemId"
            placeholder="ex. 1"
            onChange={handleChange}
          />
          {found ? (
            <p className="form-label text-info">
              Process details:{" "}
              {procesItem.amount +
                " " +
                procesItem.material.unitMeasure +
                " " +
                procesItem.material.materialName}
            </p>
          ) : (
            <p className="form-label text-danger">Process item not found</p>
          )}
        </div>
        <div className="row mx-auto">
          <div className="col-6">
            <div className="d-flex col justify-content-between">
              <label htmlFor="inputName" className="form-label">
                Start date
              </label>
              <p className="form-label text-danger">{errorState.processName}</p>
            </div>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              minDate={new Date()}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="col-6">
            <div className="d-flex col justify-content-between">
              <label htmlFor="inputName" className="form-label">
                End date
              </label>
              <p className="form-label text-danger">{errorState.processName}</p>
            </div>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              minDate={new Date()}
              onChange={(date) => setEndDate(date)}
            />
          </div>
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

export default AddProcess;
