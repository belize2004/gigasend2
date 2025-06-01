import { Stripe } from 'stripe';
import { STRIPE_SECRET_KEY } from './constant';

export const stripe = new Stripe(STRIPE_SECRET_KEY)

export function createProduct(name: string) {
  return stripe.products.create({
    name
  })
}

export function createPlan({ nickname, amount, productId }: { nickname: string, amount: number, productId: string }) {
  return stripe.plans.create({
    currency: 'usd',
    interval: 'month',
    amount,
    product: productId,
    nickname,
    usage_type: 'licensed',
  })
}

export function createCustomer({ name, email }: { name: string, email: string }) {
  return stripe.customers.create({
    name,
    email
  });
}