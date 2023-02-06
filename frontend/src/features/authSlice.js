import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { url } from "./api";
import jwtDecode from 'jwt-decode'

const initialState = {
  token: localStorage.getItem('token'),
  name: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  updateStatus: '',
  updateError: '',
  userLoaded: false,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password
      });
      localStorage.setItem('token', token.data)

      return token.data

    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/auth/login`, {
        email: user.email,
        password: user.password
      });
      localStorage.setItem('token', token.data)

      return token.data

    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.put(`${url}/auth/updateUser`, {
        ...user,
        name: user.newName,
        password: user.newPassword2
      });
      localStorage.setItem('token', token.data)

      return token.data

    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data)
    }
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token
      if (token) {
        const user = jwtDecode(token)
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true
        }
      }
    },

    logoutUser(state, action) {
      localStorage.removeItem('token');
      //reset state
      return {
        ...state,
        token: '',
        name: '',
        email: '',
        _id: '',
        registerStatus: '',
        registerError: '',
        loginStatus: '',
        loginError: '',
        updateStatus: '',
        updateError: '',
        userLoaded: false,
      }
    }
  },
  extraReducers: (builder) => {
    //Register user
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: 'pending' }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {

        const user = jwtDecode(action.payload)
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: 'success'
        }
      } else return state
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: 'rejected',
        // error available as action.payload due to using rejectWithVAlue
        registerError: action.payload
      }
    });

    // Login user
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: 'pending' }
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {

        const user = jwtDecode(action.payload)
        console.log(user)
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: 'success'
        }
      } else return state
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: 'rejected',
        // error available as action.payload due to using rejectWithVAlue
        loginError: action.payload
      }
    });

    //Update user
    builder.addCase(updateUser.pending, (state, action) => {
      return { ...state, updateStatus: 'pending' }
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {

        const user = jwtDecode(action.payload)
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          updateStatus: 'success'
        }
      } else return state
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: 'rejected',
        // error available as action.payload due to using rejectWithVAlue
        updateError: action.payload
      }
    });


  },
});

export const { loadUser, logoutUser } = authSlice.actions
export default authSlice.reducer;