const controller = require("../orders/controller");
const Order = require("../common/models/Order");

jest.mock("../common/models/Order");

describe("Order Controller Unit Tests", () => {

  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

// create order
  describe("createOrder", () => {

    it("should create order with valid input", async () => {
      req.body = {
        id: 1,
        customerName: "John",
        product: "Laptop",
        quantity: 2
      };

      Order.create.mockResolvedValue(req.body);

      await controller.createOrder(req, res);

      expect(Order.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("should return 400 if missing fields", async () => {
      req.body = { id: 1 };

      await controller.createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing fields" });
    });

  });

// get all
  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const mockOrders = [{ id: 1 }, { id: 2 }];
      Order.findAll.mockResolvedValue(mockOrders);

      await controller.getAllOrders(req, res);

      expect(Order.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });
  });

// get by id
  describe("getOrderById", () => {
    it("should return order if found", async () => {
      const mockOrder = { id: 1 };
      req.params.id = 1;

      Order.findByPk.mockResolvedValue(mockOrder);

      await controller.getOrderById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    it("should return 404 if not found", async () => {
      req.params.id = 1;
      Order.findByPk.mockResolvedValue(null);

      await controller.getOrderById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

// update
  describe("updateOrder", () => {
    it("should update order status", async () => {
      const mockOrder = {
        update: jest.fn().mockResolvedValue(true)
      };

      req.params.id = 1;
      req.body.status = "shipped";

      Order.findByPk.mockResolvedValue(mockOrder);

      await controller.updateOrder(req, res);

      expect(mockOrder.update).toHaveBeenCalledWith({ status: "shipped" });
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    it("should return 404 if order not found", async () => {
      Order.findByPk.mockResolvedValue(null);

      await controller.updateOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

// delete
  describe("deleteOrder", () => {
    it("should delete order", async () => {
      const mockOrder = {
        destroy: jest.fn().mockResolvedValue(true)
      };

      req.params.id = 1;

      Order.findByPk.mockResolvedValue(mockOrder);

      await controller.deleteOrder(req, res);

      expect(mockOrder.destroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Order deleted" });
    });

    it("should return 404 if not found"  , async () => {
      Order.findByPk.mockResolvedValue(null);

      await controller.deleteOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

});