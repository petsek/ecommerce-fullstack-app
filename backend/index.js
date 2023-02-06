const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')


const auth = require('./routes/auth')
const order = require('./routes/order')
const productsRoute = require('./routes/products');



const app = express();

require('dotenv').config()

const port = process.env.PORT || 5000
const uri = process.env.DB_URI


app.use(express.json());
app.use(cors())

app.use('/api/auth', auth);
app.use('/api/order', order);
app.use('/api/products', productsRoute);

app.get('/', (req, res) => {
  res.send('Welcome to our onlin shop API')
})

// app.get('/products', (req, res) => {
//   res.send(products)
// })

app.listen(port, console.log(`Server is running on port ${port}`))

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDb connection succesfull'))
  .catch((err) => console.log('MonogDb connection failed', err.message))