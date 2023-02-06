import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { url } from "./api";


const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  phone: '',
  street: '',
  city: '',
  postCode: '',
  cartTotalAmount: '',
  cartProducts: [],
  orderStatus: '',
  orderError: ''
}

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const newOrder = await axios.post(`${url}/order/create`, {
        userId: order.userId,
        userName: order.userName,
        userEmail: order.userEmail,
        phone: order.phone,
        street: order.street,
        city: order.city,
        postCode: order.postCode,
        cartTotalAmount: order.cartTotalAmount,
        cartProducts: order.cartProducts,
      });
      return newOrder

    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderStatus(state, action) {
      return {
        ...state,
        orderStatus: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      return { ...state, orderStatus: 'pending' }
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      if (action.payload) {

        const newOrder = action.payload
        return {
          ...state,
          userId: newOrder.userId,
          userName: newOrder.userName,
          userEmail: newOrder.email,
          phone: newOrder.phone,
          street: newOrder.street,
          city: newOrder.city,
          postCode: newOrder.postCode,
          cartTotalAmount: newOrder.cartTotalAmount,
          cartProducts: newOrder.cartProducts,
          orderStatus: 'fulfilled',
        }
      } else return state
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      return {
        ...state,
        orderStatus: 'rejected',
        // error available as action.payload due to using rejectWithVAlue
        orderError: action.payload
      }
    });

  },
});

export default orderSlice.reducer;
export const { clearOrderStatus } = orderSlice.actions