// esm.sh is used to compile stripe-node to be compatible with ES modules.
import Stripe from "https://esm.sh/stripe@15.8.0?target=deno";

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
});
