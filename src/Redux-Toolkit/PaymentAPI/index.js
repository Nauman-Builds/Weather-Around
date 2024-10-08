import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const getPaymentIntentByStripe = createApi({
  reducerPath: 'PaymentIntentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.stripe.com/v1',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  endpoints: builder => ({
    createPaymentIntent: builder.mutation({
      query: data => ({
        url: `/payment_intents`,
        method: 'POST',
        body: new URLSearchParams({
          amount: data.amount.toString(),
          currency: data.currency,
        }).toString(),
      }),
    }),
  }),
});

export const {useCreatePaymentIntentMutation} = getPaymentIntentByStripe;
