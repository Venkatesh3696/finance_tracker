import { Router } from "express";

import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:customerId", getCustomer);
router.put("/:customerId", updateCustomer);
router.delete("/:customerId", deleteCustomer);

export default router;
