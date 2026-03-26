const Order = require('../common/models/Order');

// Simulate async delay (payment/email)
const simulateAsyncTask = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Payment processed');
    }, 2000);
  });
};

// POST /orders
exports.createOrder = async (req, res) => {
  try {
    const { id, customerName, product, quantity } = req.body;

    if (!id || !customerName || !product || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await simulateAsyncTask(); // REQUIRED async operation

    const order = await Order.create({
      id,
      customerName,
      product,
      quantity
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

// GET /orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

// GET /orders/:id
exports.getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
};

// PATCH /orders/:id
exports.updateOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const { status } = req.body;
  await order.update({ status });

  res.json(order);
};

// DELETE /orders/:id
exports.deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  await order.destroy();

  res.json({ message: 'Order deleted successfully' });
};