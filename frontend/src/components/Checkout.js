import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { clearCart, getTotals } from "../features/cartSlice";
import { clearOrderStatus, createOrder } from "../features/orderSlice";
import { useEffect } from "react";



const Checkout = () => {
  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)
  const order = useSelector((state) => state.order)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  useEffect(() => {
    dispatch(clearOrderStatus())
  }, [dispatch])

  const [shippingDetails, setshippingDetails] = useState({
    phone: '',
    street: '',
    city: '',
    postCode: ''
  })

  const cartProducts = cart.cartItems.map((item) => {
    return {
      productId: item.id,
      producName: item.name,
      productImage: item.image,
      productPrice: item.price,
      cartQuantity: item.cartQuantity,
      cartAmount: item.cartQuantity * item.price
    };
  });

  const newOrder = {
    userId: auth._id,
    userName: auth.name,
    userEmail: auth.email,
    phone: shippingDetails.phone,
    street: shippingDetails.street,
    city: shippingDetails.city,
    postCode: shippingDetails.postCode,
    cartTotalAmount: cart.cartTotalAmount,
    cartProducts
  }

  console.log(newOrder)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(newOrder))
    dispatch(clearCart())
  }

  return (
    <div className="cart-container">
      <h2>Checkout</h2>
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cart.cartItems?.map((cartItem) =>
            <div className="cart-item" key={cartItem._id}>
              <div className="cart-product">
                <img src={cartItem.image} alt={cartItem.name} />
                <div>
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.desc}</p>
                </div>
              </div>
              <div className="cart-product-price">£{cartItem.price}</div>
              <div className="checkout-product-quantity">
                <div className="count">{cartItem.cartQuantity}</div>
              </div>
              <div className="cart-product-total-price">
                £{cartItem.price * cartItem.cartQuantity}
              </div>
            </div>
          )}
        </div>
        <form className="checkout-shipping-details" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <div className="contact">
            <h4>Contact</h4>
            <p>Name: {auth.name}</p>
            <p>Email: {auth.email}</p>
            <input type='tel' placeholder='Phone Nmuber' required onChange={(e) => setshippingDetails({ ...shippingDetails, phone: e.target.value })} />
          </div>
          <div className="address">
            <h4>Shipping Address</h4>
            <input type='text' placeholder='Street' required onChange={(e) => setshippingDetails({ ...shippingDetails, street: e.target.value })} /> <br />
            <input type='text' placeholder='City' required onChange={(e) => setshippingDetails({ ...shippingDetails, city: e.target.value })} /> <br />
            <input type='text' placeholder='Post Code' required onChange={(e) => setshippingDetails({ ...shippingDetails, postCode: e.target.value })} />
          </div>
          {(order.orderStatus === 'fulfilled') ?
            <>
              <p className="orderFeedback"> Your order is complete, You can track you order in "My orders" </p>
              <div className="continue-shopping ">
                <Link to='/'>
                  <button>Back to Shopping</button>
                </Link>
              </div>
            </>
            :
            (order.orderStatus === 'rejected') ?
              <>
                <p className="orderFeedback"> There was some problem with your order please try again later </p>
                <div className="continue-shopping ">
                  <Link to='/'>
                    <button>Back to Shopping</button>
                  </Link>
                </div>
              </>
              :

              <div className="cart-summary">
                <Link to='/cart'><button className="clear-cart">Back to Cart</button></Link>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Total</span>
                    <span className="amount">£{cart.cartTotalAmount}</span>
                  </div>
                  {auth._id ?
                    <input type='submit' value='Order' />
                    :
                    <></>}
                  <div className="continue-shopping ">
                    <Link to='/'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                      </svg>
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>

          }


        </form>
      </div>
    </div >
  );
}

export default Checkout;