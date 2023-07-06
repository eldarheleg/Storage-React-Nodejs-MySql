import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditSupplier() {
  const navigate = useNavigate();
  //const {id} = useParams();

  const [formState, setFormState] = useState({
    supplierName: "",
    jib: "",
    pib: "",
    phoneNumber: "",
    contactPerson: "",
    supplierEmail: "",
  });
  //const [newFormState, setNewFormState] = useState({});
  const [errorState, setErrorState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const { id } = useParams();
  async function fetchData() {
    axios
      .get(`http://localhost:3001/api/suppliers/${id}`)
      .then((res) => {
        //console.log(res);
        setFormState({
          ...formState,
          supplierName: res.data.supplier.supplierName,
          jib: res.data.supplier.jib,
          pib: res.data.supplier.pib,
          phoneNumber: res.data.supplier.phoneNumber,
          contactPerson: res.data.supplier.contactPerson,
          supplierEmail: res.data.supplier.supplierEmail,
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
      .patch(`http://localhost:3001/api/suppliers/update/${id}`, formState)
      .then((response) => {
      console.log(response);
        toast.success("Supplier created successfull");
        navigate("/home/suppliers");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      
      <ToastContainer />
      <h4>Edit Supplier</h4>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
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
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputEmail4" className="form-label">
              Jib
            </label>
            <p className="form-label text-danger">{errorState.jib}</p>
          </div>
          <input
            value={formState.jib}
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
            value={formState.pib}
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
            value={formState.phoneNumber}
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
            value={formState.contactPerson}
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
            value={formState.supplierEmail}
            type="email"
            className="form-control"
            name="supplierEmail"
            placeholder="Supplier email"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success w-50">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSupplier;
