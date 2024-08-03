import Stripe from "stripe";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CreatePaymentIntentResponse } from "./payment.interface";
import config from "../../config";

const createPaymentInStripe = async (price: number) => {
  if (!price) {
    throw new AppError(httpStatus.BAD_REQUEST, "Price not found");
  }

  const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);

  try {
    const amountInCents = Math.round(price * 100); // Ensure the amount is an integer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
    });

    const response: CreatePaymentIntentResponse = {
      clientSecret: paymentIntent.client_secret as string,
    };

    return response;
  } catch (error) {
    console.error("Error creating payment intent:", error);

    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe error details:", error.message);
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Payment intent creation failed"
    );
  }
};

export const PaymentServices = {
  createPaymentInStripe,
};
