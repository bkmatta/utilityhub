import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useEffect, useRef } from "react";

const PUSH_API = `https://${process.env.EXPO_PUBLIC_DOMAIN}/api/push-tokens`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function isGranted(result: Notifications.NotificationPermissionsStatus): boolean {
  // The runtime object has `granted` per expo docs, but the TypeScript type
  // derives from expo's PermissionResponse which can be incomplete in older
  // expo type packages. Cast to extract the boolean safely.
  const r = result as unknown as { granted?: boolean; status?: string };
  if (typeof r.granted === "boolean") return r.granted;
  if (typeof r.status === "string") return r.status === "granted";
  return false;
}

async function registerForPushNotifications(): Promise<string | null> {
  if (Platform.OS === "web") return null;

  const existing = await Notifications.getPermissionsAsync();
  let granted = isGranted(existing);

  if (!granted) {
    const requested = await Notifications.requestPermissionsAsync();
    granted = isGranted(requested);
  }

  if (!granted) return null;

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
}

async function sendTokenToServer(token: string): Promise<void> {
  try {
    await fetch(PUSH_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, platform: Platform.OS }),
    });
  } catch {
    // Non-fatal — token registration failure should not block the app
  }
}

export function usePushNotifications() {
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotifications().then((token) => {
      if (token) sendTokenToServer(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (_notification) => {
        // Notification received while app is foregrounded
      },
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (_response) => {
        // User tapped a notification
      },
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);
}
