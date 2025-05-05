import { Customer } from "../models/customer.model.js";
import { Loan } from "../models/loan.model.js";

export const createLoan = async (req, res) => {
  try {
    const { customerId, itemDescription, loanAmount } = req.body;
    const shopkeeperId = req.userId;

    if (!customerId || !loanAmount) {
      return res
        .status(400)
        .json({ message: "all fields required are needed!" });
    }

    const loan = new Loan({
      shopkeeperId,
      loanAmount,
      customerId,
      itemDescription,
    });

    await loan.save();

    res.status(201).json({ message: "loan created successfully!", loan });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getLoans = async (req, res) => {
  try {
    const shopkeeperId = req.userId;

    const loans = await Loan.find({ shopkeeperId });
    console.log({ loans });

    res.status(201).json({ message: "loan created successfully!", loans });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);
    console.log({ loan });

    res.status(201).json({ message: "loan fetched successfully!", loan });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateLoan = async (req, res) => {
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

export const deleteLoan = async (req, res) => {
  const shopkeeperId = req.userId;

  try {
    const { loanId } = req.params;

    const loan = await Loan.findByIdAndDelete(loanId);
    console.log({ loan });

    res.status(201).json({ message: "loan deleted successfully!", loan });
  } catch (error) {
    console.error("Error while dleting customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};
