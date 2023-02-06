import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";

const NabBar = () => {
  const { cartTotalQuantity } = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (<nav className="nav-bar">
    <Link to='/'>
      <h2>Fruit From Your Tree</h2>
    </Link>
    <Link to='/cart'>
      <div className="nav-bag">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-basket3" viewBox="0 0 16 16">
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z" />
        </svg>
        <span className="bag-quantity">
          <span>{cartTotalQuantity}</span>
        </span>
      </div>
    </Link>
    {
      auth._id ?
        <AuthLinks>
          <Link to='/dashboard'>My Dashboard</Link>
          <Logout onClick={() => {
            dispatch(logoutUser(null))
            dispatch(clearCart())
            navigate('/')
            toast.warning('Logged out', { position: 'bottom-left' })
          }}> Logout </Logout>
        </AuthLinks>
        :
        <AuthLinks>
          <Link to='/auth/login'>Login</Link>
          <Link to='/auth/register'>Register</Link>
        </AuthLinks>
    }
  </nav>
  );
}

export default NabBar;

const AuthLinks = styled.div`
a {
  &:last-child {
    margin-left: 2rem;
  }
}
`

const Logout = styled.div`
color: white;
cursor: pointer;
`