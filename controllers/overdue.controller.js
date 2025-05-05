import { Customer } from "../models/customer.model.js";
import { Loan } from "../models/loan.model.js";

export const getOverdues = async (req, res) => {
  // /Overdue route to list customers with overdue loans
  try {
    const shopkeeperId = req.userId;

    const overdueCustomerIds = await Loan.distinct("customerId", {
      shopkeeperId,
      status: "overdue",
    });

    const overdueCustomers = await Customer.find({
      _id: { $in: overdueCustomerIds },
    });

    res.status(200).json({
      message: "overdue Customers retrived successfully!",
      overdueCustomers,
    });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};
