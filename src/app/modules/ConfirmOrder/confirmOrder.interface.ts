export type TConfirmOrderRequest = {
  orderId: string;
  transactionId?: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  deliveryAddress: string;
  paymentMethod: string;
  orderedProduct: { [productId: string]: number };
  totalPrice: number;
  orderDate: string;
  paymentDate?: string;
  status?: string;
};
