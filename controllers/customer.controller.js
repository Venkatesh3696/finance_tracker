import { Customer } from "../models/customer.model.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, address = "" } = req.body;
    const shopkeeperId = req.userId;

    if (!name || !phone || !shopkeeperId) {
      console.log({ shopkeeperId, name, phone });

      return res.status(400).json({ message: "Name and phone are needed!" });
    }
    const existingCustomer = await Customer.findOne({ phone });

    if (existingCustomer) {
      return res.status(400).json({ message: "phone already registered!" });
    }

    const customer = new Customer({ shopkeeperId, name, phone, address });

    await customer.save();

    res
      .status(201)
      .json({ message: "Customer created successfully!", customer });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const shopkeeperId = req.userId;

    const customers = await Customer.find({ shopkeeperId });

    res
      .status(200)
      .json({ message: "Customers retrived successfully!", customers });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const shopkeeperId = req.userId;
    const { customerid } = req.params;

    const customer = await Customer.find({
      shopkeeperId,
      customerId: customerid,
    });

    res
      .status(200)
      .json({ message: "Customers retrived successfully!", customer });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const shopkeeperId = req.userId;
  try {
    console.log({ customerId });
    const customer = await Customer.findById(customerId);
    console.log({ customer });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.shopkeeperId.toString() !== shopkeeperId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this customer" });
    }

    const allowedFields = ["name", "phone", "address"];

    for (const key of allowedFields) {
      if (req.body[key]) {
        customer[key] = req.body[key];
      }
    }

    await customer.save();
    res.status(200).json({ message: "Customer updated", customer });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCustomer = async (req, res) => {
  const shopkeeperId = req.userId;
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.shopkeeperId.toString() !== shopkeeperId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this customer" });
    }

    await customer.deleteOne();
    res.status(200).json({ message: "customer deleted Successfully!" });
  } catch (error) {
    console.error("Error while deleting customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};
