import { Router } from "express";
import { CreateCheckOut, DeleteCustomer, GetCustomers, Webhook } from "../controllers/stripe.js";
// import bodyParser from "body-parser";

let router = Router();

router.post('/checkout', CreateCheckOut);
router.get('/customers', GetCustomers);
router.get('/customers/delete/:id', DeleteCustomer);
router.post('/webhook', Webhook);

export default router;