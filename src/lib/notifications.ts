import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Order } from "../types";

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

const getUserToken = async (userId: String) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;

  return data.expo_push_token;
};

export const notifyUserOrderUpdate = async (order: Order) => {
  if (!order.user_id) return;
  const token = await getUserToken(order.user_id);
  if (!token) return;

  let title = "";
  let body = "";

  switch (order.status) {
    case "Cooking":
      title = "Your order #" + order.id + " is being cooked!";
      body =
        "Our chefs are working on your delicious meal. It will be ready soon.";
      break;
    case "Delivering":
      title = "Your order #" + order.id + " is on the way!";
      body =
        "Hang tight! Your order is out for delivery and will be with you shortly.";
      break;
    case "Delivered":
      title = "Your order #" + order.id + " has been delivered!";
      body = "Bon appétit! Your order has arrived. Enjoy your meal!";
      break;
    default:
      title = "Order Update";
      body = "There is an update on your order status.";
  }

  sendPushNotification(token, title, body);
};

const getAdminsToken = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("group", "ADMIN");
  if (error) return null;

  return data;
};

export const notifyAdminNewOrder = async (order: Order) => {
  const adminTokens = await getAdminsToken();

  if (!adminTokens) return;

  adminTokens?.forEach((admin) => {
    const token = admin.expo_push_token;

    if (!token) return;

    const title = `New Order #${order.id}`;

    const body = `Order Status: ${
      order.status
    }\nTotal Amount: $${order.total.toFixed(2)}\nPlaced on: ${new Date(
      order.created_at
    ).toLocaleString()}`;

    sendPushNotification(token, title, body);
  });
};

async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
