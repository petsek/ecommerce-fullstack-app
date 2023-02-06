import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'

import { addToCart } from "../features/cartSlice";

const Home = () => {
  const products = useSelector((state) => state.products)

  const data = products.items;
  const error = products.error;
  const status = products.status;

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  }

  return (
    <div className="home-container">
      {(status === 'pending') ?
        <p>Loading...</p>
        : error ?
          <p> An error occured..</p>
          :
          <>
            <h2>Tree Selection</h2>
            <div className="products">
              {data?.map((product) => (
                <div key={product._id} className="product">
                  <Link to={`/${product._id}`}>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name} />
                    <div className="details">
                      <span>{product.desc}</span>
                      <span className="price">£{product.price}</span>
                    </div>
                  </Link>
                  <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
                </div>
              ))}
            </div>
          </>
      }
    </div>
  )
}

export default Home;
