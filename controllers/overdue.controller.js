import { Loan } from "../models/loan.model.js";

export const getOverdues = async (req, res) => {
  // /Overdue route to list customers with overdue loans
  try {
    const shopkeeperId = req.userId;

    const overdueCustomers = await Loan.find({
      shopkeeperId,
      status: "overdue",
    })
      .populate("customerId", "name phone address trustScore")
      .select("loanAmount balance dueDate issueDate status customerId");

    res.status(200).json({
      message: "overdue Customers retrived successfully!",
      overdueCustomers,
    });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};
