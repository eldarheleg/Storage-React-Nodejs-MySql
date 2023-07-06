import { Link } from "react-router-dom";
import "./index.css";

function Welcome() {
  return (
    <>
      <div className="card m-3 p-2 text-center">
        <div className="mh-50">
          <img
            src="https://images.pexels.com/photos/7654396/pexels-photo-7654396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="card-img img-thumbnail"
            alt="Wild Landscape"
          />
        </div>
        <div className="card-img-overlay">
          <div className="alert alert-info mx-3 my-3 px-5" role="alert">
            <h4 className="alert-heading mb-5">
              Welcome to the store management system!
            </h4>
            <p>
              We are delighted to introduce you to our comprehensive platform
              designed to simplify and enhance your employee management
              experience. With our system, you can streamline your
              administrative tasks, boost efficiency, and create a more
              productive work environment.
            </p>
            <p>
              Our Employee Management System offers a range of powerful features
              to support you in managing your workforce effectively. From
              centralized employee records to seamless attendance tracking,
              payroll management, and performance evaluation, we have you
              covered.
            </p>
            <hr />
            <div className="alert alert-secondary" role="alert">
              You can't access without login or admin registraion!
            </div>
            <hr />
            <div className="d-flex flex-row mb-3 justify-content-between">
              <Link
                to={"/registration/admin"}
                className="p-2 btn btn-primary btn-block w-25"
              >
                Admin Registration
              </Link>

              <Link
                to={"/login"}
                className="p-2 btn btn-primary btn-block w-25"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
