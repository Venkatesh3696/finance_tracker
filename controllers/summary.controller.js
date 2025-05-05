import { Loan } from "../models/loan.model.js";
import { Repayment } from "../models/repayment.model.js";

export const getSummary = async (req, res) => {
  try {
    const shopkeeperId = req.userId;

    const loansOfShopkeeper = await Loan.find({ shopkeeperId });
    const repaymentsToShopkeeper = await Repayment.find({ shopkeeperId });

    // Total loaned, total collected, overdue amount, avg repayment time

    const totalLoanedAmount = loansOfShopkeeper.reduce(
      (total, loan) => (total += loan.loanAmount),
      0
    );
    const totalLoanCollected = repaymentsToShopkeeper.reduce(
      (total, payment) => (total += payment.amount),
      0
    );

    const totalOverdueAmount = totalLoanedAmount - totalLoanCollected;

    res.status(200).json({
      message: "Customers retrived successfully!",
      totalLoanedAmount,
      totalLoanCollected,
      totalOverdueAmount,
    });
  } catch (error) {
    console.error("Error while retriving customers", error);
    res.status(500).json({ message: "Server error", error });
  }
};
