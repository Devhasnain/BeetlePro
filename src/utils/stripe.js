import Stripe from "stripe";
import config from "../../config.js";

export const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

let Stripe_Fields = {
    payment_method_types: ['card'],
    mode: "payment",
    success_url: "http://localhost:3002/",
    cancel_url: "http://localhost:3002/"
}

export const createCheckOut = async (data) => {
    try {
        let { customerId, product } = data;
        let price = Math.round(product.price * 100);
        let { id } = await stripe.checkout.sessions.create({
            ...Stripe_Fields,
            customer: customerId,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product?.title ?? "No Product title was provided",
                            description: product?.description ?? "No Product description was provided",
                            images: [...product?.images],
                            metadata: {
                                order_id: "test 1qewr qew rqwe rqew",
                                order_status: "test 1 qweq ewr qew rqe",
                                order_s: "test 1 qewrqwerqwerqew eqrqewr ",
                            },
                        },
                        unit_amount: price
                    },
                }
            ],
            metadata: {
                order_id: "test 1qewr qew rqwe rqew",
                order_status: "test 1 qweq ewr qew rqe",
                order_s: "test 1 qewrqwerqwerqew eqrqewr ",
            }
        });

        return id;
    } catch (error) {
        throw new Error(error)
    }
}

export const UpdateCustomerPurchaseHistory = async (data) => {
    try {
        let { customerId, product, metadata } = data;
        let date = new Date().toLocaleString().split("GMT")[0];
        await stripe.customers.update(customerId, {
            metadata: {
                ...metadata,
                arr: JSON.stringify([
                    {
                        name: "text5"
                    },
                    {
                        name: "text4"
                    },
                    {
                        name: "text2"
                    },
                    {
                        name: "text3"
                    },

                ])
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}