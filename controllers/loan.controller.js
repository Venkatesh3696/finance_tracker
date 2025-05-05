import { Customer } from "../models/customer.model.js";
import { Loan } from "../models/loan.model.js";

export const createLoan = async (req, res) => {
  try {
    const { customerId, itemDescription, loanAmount, issueDate } = req.body;
    const shopkeeperId = req.userId;

    if (!customerId || !loanAmount) {
      return res
        .status(400)
        .json({ message: "all fields required are needed!" });
    }

    const loanData = {
      shopkeeperId,
      loanAmount,
      customerId,
      itemDescription,
    };

    if (issueDate) {
      const parsedDate = new Date(issueDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          message: "Invalid issue date format. Use YYYY-MM-DD",
        });
      }

      if (parsedDate > new Date()) {
        return res.status(400).json({
          message: "Issue date cannot be in the future",
        });
      }

      loanData.issueDate = parsedDate;
    }

    const loan = new Loan(loanData);

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

    res.status(200).json({ message: "loans retrived successfully!", loans });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);

    res.status(200).json({ message: "loan fetched successfully!", loan });
  } catch (error) {
    console.error("Error while creating customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateLoan = async (req, res) => {
  const { laonId } = req.params;
  const shopkeeperId = req.userId;
  try {
    console.log({ laonId });
    const loan = await Loan.findById(laonId);
    console.log({ loan });

    if (!loan) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (loan.shopkeeperId.toString() !== shopkeeperId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this Loan!" });
    }

    const allowedFields = ["frequency", "issueDate", "loanAmount"];

    for (const key of allowedFields) {
      if (req.body[key]) {
        loan[key] = req.body[key];
      }
    }

    await loan.save();

    const { customerId } = loan;

    const customer = await Customer.findById(customerId);
    await customer.updateLoanAmounts();
    await customer.save();

    res.status(200).json({ message: "Customer updated", loan });
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

    res.status(200).json({ message: "loan deleted successfully!", loan });
  } catch (error) {
    console.error("Error while dleting customer", error);
    res.status(500).json({ message: "Server error", error });
  }
};
