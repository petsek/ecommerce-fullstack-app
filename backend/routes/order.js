const express = require('express');
const { Order } = require('../models/order');

const router = express.Router();

router.post("/create", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;