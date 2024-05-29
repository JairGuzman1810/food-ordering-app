import { View, Text, Alert } from "react-native";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const { profile } = useAuth();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newTokenString: string) => {
    if (!profile || !profile.id) return;

    setExpoPushToken(newTokenString);

    if (!newTokenString) return;

    await supabase
      .from("profiles")
      .update({ expo_push_token: newTokenString })
      .eq("id", profile.id);
  };

  useEffect(() => {
    if (!profile) {
      return;
    }

    registerForPushNotificationsAsync()
      .then((token) => savePushToken(token || ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // Show an alert when a notification is received
        if (
          notification.request.content.title &&
          notification.request.content.body
        ) {
          Alert.alert(
            notification.request.content.title,
            notification.request.content.body
          );
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [profile]); // Dependency array includes profile to re-run effect if profile changes

  return <>{children}</>;
};

export default NotificationProvider;
