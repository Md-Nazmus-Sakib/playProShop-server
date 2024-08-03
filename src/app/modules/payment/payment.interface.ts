export type TCreatePaymentIntentRequest = {
  price: number;
};

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}
