import { Router } from "express";

import {
  createLoan,
  getLoan,
  getLoans,
  deleteLoan,
  updateLoan,
} from "../controllers/loan.controller.js";

const router = Router();

router.post("/", createLoan);
router.get("/", getLoans);
router.get("/:loanId", getLoan);
router.put("/:loanId", updateLoan);
router.delete("/:loanId", deleteLoan);

export default router;
