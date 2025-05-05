import { Router } from "express";

import {
  createRepayment,
  getRepayments,
} from "../controllers/repayment.controller.js";

const router = Router();

router.post("/", createRepayment);
router.get("/", getRepayments);

export default router;
