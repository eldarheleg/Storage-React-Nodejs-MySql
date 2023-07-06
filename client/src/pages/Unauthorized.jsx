import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/login",{replace: true});

  return (
    <div className="container text-center">
      <section className="card text-white bg-dark w-50 text-center mx-auto my-4">
        <div class="card-header">Unauthorized</div>
        <br />
        <p>You do not have access to the requested page.</p>
        <br />
        <p>You have to login or register as admin to access.</p>
        <div className="p-2">
          <br />
          <button className="btn btn-light" onClick={goBack}>
            Go Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;
