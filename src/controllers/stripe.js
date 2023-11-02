import Stripe from "stripe";
import handleError from "../utils/ReturnError.js"
import config from "../../config.js";
import { UpdateCustomerPurchaseHistory, createCheckOut } from "../utils/stripe.js";
import Users from "../models/User.js";
import Orders from "../models/Order.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

export const CreateCheckOut = async (req, res) => {
    try {

        let { user_id, order_id } = req.body;

        // if (!user_id || !order_id) {
        //     return res.status(400).json({ msg: "Bad request", status: false })
        // }

        let user = await Users.findOne({ user_id });

        // let order = await Orders.findOne({ order_id });

        let customer = (await stripe.customers.list())?.data?.find((item) => item.email === user.email);

        // if (customer) {
        //     try {
        //         let id = await createCheckOut({ customerId: customer.id, product });

        //         if (!id) {
        //             throw new Error("Unexpected error while creating stripe checkout session!");
        //         }

        //         return res.status(200).json({ sessionId: id });

        //     } catch (error) {
        //         console.log(error)
        //         let response = handleError(error);
        //         return res.status(response.statusCode).json({ response, status: false });
        //     }
        // }

        // let newCustomer = await stripe.customers.create({
        //     name: user.name,
        //     email: user.email,
        //     phone: user.user_phone
        // });

        // let id = await createCheckOut({ customerId: newCustomer.id, product });

        // if (!id) {
        //     throw new Error("Unexpected error while creating stripe checkout session!");
        // }

        return res.status(200).json({ customer });
    } catch (error) {

        let response = handleError(error);
        return res.status(response.statusCode).json({ msg: response.body, status: false });
    }
}

export const GetCustomers = async (req, res) => {
    try {
        let customers = await stripe.customers.list();
        return res.status(200).json({ customers, status: true });
    } catch (error) {
        return res.status(500).json({ msg: error?.message })
    }
}

export const DeleteCustomer = async (req, res) => {
    try {
        let { id } = req.params;
        let customer = await stripe.customers.del(id);
        return res.status(200).json({ customer })
    } catch (error) {
        return res.status(500).json({ msg: error?.message })
    }
}

export const Webhook = async (req, res) => {


    let rawBody = req.rawBody
    const sig = req.headers['stripe-signature'];

    // let rawbody = JSON.stringify(req.body);

    try {
        let event = stripe.webhooks.constructEvent(rawBody, sig, 'whsec_1eb2016dfc367e83361d8160a8f4ca38c37266664e7015af9d1fa2844ddb9507');
        switch (event.type) {
            case 'payment_intent.succeeded':
                // console.log(event)
                // console.log(event.object)
                // console.log(event.data.object)
                // console.log(event.data.object.metadata)
                // console.log(event.data.object.customer)
                // console.log(event.data.object.object);

                // const paymentIntent = event.data.object;
                // const productMetadata = paymentIntent.charges.data[0].payment_method_details.metadata;

                // console.log(event.data.object?.charges?.data)
                // // Extract the metadata fields
                // const order_id = productMetadata.order_id;
                // const order_status = productMetadata.order_status;
                // const order_s = productMetadata.order_s;

                // console.log(productMetadata)
                // console.log(order_id,order_status,order_s)
                // Handle successful payment
                break;

            case "checkout.session.completed":
                console.log(event.data.object.id);

                let data = await stripe.checkout.sessions.listLineItems(event.data.object.id)
            // console.log(data.data.)
            // Add more cases for other event types as needed
        }
        return res.json({ received: true });
    } catch (err) {
        console.log(err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // return res.json({ received: true });


}
