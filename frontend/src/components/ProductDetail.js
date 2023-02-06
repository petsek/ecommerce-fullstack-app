import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom'

import { addToCart } from "../features/cartSlice";

const ProductDetail = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products)
  const error = products.error;
  const status = products.status;

  console.log(products.items)
  let { productId } = useParams()
  console.log(productId)

  const product = products.items.find((product) => product._id === productId)

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
            <div key={product._id} className="productDetail">
              <h3>{product.name}</h3>
              <div className='feature-container'>
                <img src={product.image} alt={product.name} />
                <div className="feature-items">
                  <p>{product.longDesc}</p>
                  <div className="feature-item-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" class="bi bi-brightness-alt-high-fill" viewBox="0 0 16 16">
                      <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4z" />
                    </svg>
                    <p>{product.feature1}</p>
                  </div>
                  <div className="feature-item-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" class="bi bi-droplet-half" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                      <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
                    </svg>
                    <p>{product.feature2}</p>
                  </div>
                  <div className="feature-item-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <p>{product.feature3}</p>
                  </div>
                  <div className="feature-item-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16">
                      <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <p>{product.feature4}</p>
                  </div>
                </div>
              </div>
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">£{product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
              <div className="continue-shopping ">
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default ProductDetail;