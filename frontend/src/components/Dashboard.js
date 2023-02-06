import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../features/authSlice";
import { StyledFormUserUpdate } from "./auth/StyledForm";


const Dashboard = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const [showUpdate, setShowUpdate] = useState(false)
  const handlToggle = () => setShowUpdate(!showUpdate)

  const [user, setUser] = useState({
    email: auth.email,
    newName: '',
    currentPassword: '',
    newPassword1: '',
    newPassword2: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user))
  }

  return (
    <div className="cart-container">
      <h2>My Dashboard</h2>
      <h3>User Details</h3>
      <div className="contact">
        <p>Name: {auth.name}</p>
        <p>Email: {auth.email}</p>
      </div>
      <button className='update-toggle' onClick={handlToggle}>Update User</button>

      {!showUpdate ? <></> :
        <StyledFormUserUpdate onSubmit={handleSubmit}>
          <h3>Update User</h3>
          <input type='text' placeholder='new name' onChange={(e) => setUser({ ...user, newName: e.target.value })} />
          <input type='password' placeholder='current password' required onChange={(e) => setUser({ ...user, currentPassword: e.target.value })} />
          <input type='password' placeholder='new password' required onChange={(e) => setUser({ ...user, newPassword1: e.target.value })} />
          <input type='password' placeholder='new password' required onChange={(e) => setUser({ ...user, newPassword2: e.target.value })} />
          <button>{auth.updateStatus === 'pending' ? <p>Submitting</p> : 'Update'}</button>
          {auth.updateStatus === 'rejected' ? <p>{auth.updateError}</p> : null}
          {(auth.updateStatus === 'success') ? <h3>Update successfull. Please log out and log in again </h3> : <></>}
        </StyledFormUserUpdate>
      }
    </div>
  );
}

export default Dashboard;