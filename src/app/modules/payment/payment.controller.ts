import sendResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

//create Product controller
const createPayment = catchAsync(async (req, res) => {
  const { price } = req.body;

  const result = await PaymentServices.createPaymentInStripe(price);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment is Created Successfully",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
};
