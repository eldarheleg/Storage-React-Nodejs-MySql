import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function Profile() {
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetchEmployee();
  }, []);
  //console.log(id)

  const fetchEmployee = () => {
    //console.log(user);
    axios
      .get(`http://localhost:3001/api/users/employees/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        //console.log(response.data)
        setUserDetails(response.data.employee);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                  />
                  <h5>{userDetails.firstName + " " + userDetails.lastName}</h5>
                  <p>{role}</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{userDetails.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">{userDetails.phoneNumber}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Address</h6>
                        <p className="text-muted">{userDetails.address}</p>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Start date</h6>
                        <p className="text-muted">
                          {new Date(userDetails.start_date).toLocaleDateString(
                            "en",
                            {
                              year: "numeric",
                              day: "2-digit",
                              month: "long",
                            }
                          )}
                        </p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>End date</h6>
                        {userDetails.fired_date === null ? (
                          <p className="text-muted">still working</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
