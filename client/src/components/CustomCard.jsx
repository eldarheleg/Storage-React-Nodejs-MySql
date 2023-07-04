function CustomCard({ title, text, id, onSomethingChange }) {
  return (
    <div className="container-fluid mx-3">
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
