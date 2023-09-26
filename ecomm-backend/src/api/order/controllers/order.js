"use strict";

/**
 *  order controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET);
// import Stripe from "stripe";
// const stripe: any = new Stripe("sk_test_...", {
//   apiVersion: "2023-08-16",
// });

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { amount, shippingAddress, city, state, pincode, token, items } =
      ctx.request.body;

    // console.log(ctx.request.body);

    await stripe.charges.create({
      amount: amount * 100,
      currency: "INR", //USD
      source: token, //this strapi token
      description: `order by user ${ctx.state.user.email}`,
    });

    const order = await strapi.db.query("api::order.order").create({
      data: {
        shippingAddress,
        city,
        state,
        pincode: Number(pincode),
        amount,
        items,
        user: ctx.state.user.email,
      },
    });

    console.log(order);
    return order;
  },
}));
