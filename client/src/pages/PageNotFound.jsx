import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <body>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you're looking for doesn't exist.</p>
          <div className="p-2">
            <br />
            <button className="btn btn-light" onClick={goBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default PageNotFound;
