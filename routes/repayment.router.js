import { Router } from "express";

import {
  createRepayment,
  deleteRepayment,
  getRepayment,
  getRepayments,
  updateRepayment,
} from "../controllers/repayment.controller.js";

const router = Router();

router.post("/", createRepayment);
router.get("/", getRepayments);
router.get("/:customerId", getRepayment);
router.put("/:customerId", updateRepayment);
router.delete("/:customerId", deleteRepayment);

export default router;
