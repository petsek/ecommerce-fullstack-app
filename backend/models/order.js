const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  cartTotalAmount: {
    type: Number,
    required: true,
  },
  cartProducts: [
    {
      productId: { type: String },
      productName: { type: String },
      productImage: { type: String },
      productPrice: { type: Number },
      cartQuantity: { type: Number },
      cartAmount: { type: Number }
    }
  ],

})

const Order = mongoose.model('Order', orderSchema);

exports.Order = Order;

// userId: '',
// userName: '',
// name: '',
// email: '',
// street: '',
// city: '',
// postCode: '',
// cartTotalAmount: '',
// cartProducts: [],

// productId: item.id,
// producName: item.name,
// productImage: item.image,
// productPrice: item.price,
// cartQuantity: item.cartQuantity,
// cartAmount: item.cartQuantity * item.price