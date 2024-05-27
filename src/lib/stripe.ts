import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });
  if (data) {
    console.log(data);
    return data;
  }
  Alert.alert("Error fetching payment sheet params");
  console.log(error);
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("Initialising payment sheet, for: ", amount);

  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );
  if (!paymentIntent || !publishableKey) return;

  const { error } = await initPaymentSheet({
    merchantDisplayName: "Jair Guzman",
    paymentIntentClientSecret: paymentIntent,
    // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //methods that complete payment after a delay, like SEPA Debit and Sofort.
    allowsDelayedPaymentMethods: true,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });

  if (!error) {
    return await openPaymentSheet();
  } else {
    return false;
  }
};

const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
    return false;
  } else {
    Alert.alert("Success", "Your order is confirmed!");
    return true;
  }
};
