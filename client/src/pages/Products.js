import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ProductCard from '../components/ProductCard';

function Products() {
  const [productsState, setProductsState] = useState([]);
  const [productsTitleState, setProductsTitleState] = useState("");
  const [productsTextState, setProductsTextState] = useState("");
  const [productTextTouchedState, setProductTextTouchedState] = useState(false);

  const isTextEmpty = productsTextState === "";
  const isTitleEmpty = productsTitleState === "";

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSomethingChanged = (data) => {
    console.log(data);
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/api/Products", {
        headers: {
          "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setProductsState(response.data);
      });
  };
  const handleTitle = (event) => {
    setProductsTitleState(event.target.value);
  };
  const handleText = (event) => {
    setProductsTextState(event.target.value);
  };

  const titleTextValidate = (event) => {
    setProductTextTouchedState(true);
  };

  const addPost = (event) => {
    event.preventDefault();
    if (!isTextEmpty && !isTitleEmpty) {
      axios
        .post(
          "http://localhost:3001/api/Products",
          {
            text: productsTextState,
            title: productsTitleState,
          },
          {
            headers: {
              "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          fetchProducts();
        });
    } else {
      toast.error("Required fields must be filled!");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <ToastContainer />
        <form onSubmit={addPost}>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="title"
              className="form-control"
              aria-describedby="text-error"
              onChange={handleTitle}
              onBlur={titleTextValidate}
            />
            {isTitleEmpty && productTextTouchedState ? (
              <div id="text-error" class="invalid-feedback d-block">
                Please enter a valid title.
              </div>
            ) : (
              <></>
            )}
            <label className="form-label" htmlFor="title">
              Title
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="text"
              className="form-control"
              onChange={handleText}
              onBlur={titleTextValidate}
            />
            {isTextEmpty && productTextTouchedState ? (
              <div id="text-error" class="invalid-feedback d-block">
                Please enter a valid text.
              </div>
            ) : (
              <></>
            )}
            <label className="form-label" htmlFor="text">
              Text
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            ADD
          </button>
        </form>
      </div>

      <div>
        <h1>Products</h1>
        <div className="container">
          <div className="row">
            {productsState.map((data) => {
              return (
                <ProductCard
                  title={data.title}
                  text={data.text}
                  id={data.id}
                  onSomethingChange={onSomethingChanged}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
