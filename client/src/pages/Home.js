import { useEffect, useState } from "react";
import ProductCard from '../components/ProductCard';
import axios from "axios";

function Home() {
  //const { authState } = useContext(AuthContext);
  const [productState, setProductState] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:3001/api/products/all", {
        headers: {
          "access-token": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setProductState(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home">
      <h1>Products</h1>
      <div className="container">
        <div className="row"></div>
        {productState.map((data) => {
          return (
            <ProductCard title={data.title} text={data.text} id={data.id} />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
