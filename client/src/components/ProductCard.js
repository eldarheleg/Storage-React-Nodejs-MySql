function ProductCard({ title, text, id, onSomethingChange }) {
  return (
    <div key={id} className="card px-0 col-4 mx-2">
      <img
        src="https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => onSomethingChange("test")}
      >
        Send data
      </button>
    </div>
  );
}

export default ProductCard;
