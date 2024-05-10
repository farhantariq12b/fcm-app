import axios from "axios";
import { v4 as uuid } from "uuid";
import admin from "firebase-admin";
import serviceAccount from "../fir-notification-38b42-firebase-adminsdk-zwy2r-9e5cb50ce4.json";
import config from "../helpers/config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

let firebaseToken: string | null = null;
let count = 0;

class FirebaseService {
  static async sendNotification({
    id,
    title,
    body,
    token,
  }: {
    id: number;
    title: string;
    body: string;
    token: string;
  }) {
    try {
      this.getFirebaseToken();
      const uid = "some-unique-id"; // Unique identifier for the user
      firebaseToken = await admin.auth().createCustomToken(uid);

      const response = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: token,
          data: {
            notificationId: id,
            title,
            body,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.serverKey}`,
          },
        }
      );

      console.log("successfully registered notification", response.data);
    } catch (error: any) {
      if (count < 3 && error?.response?.status === 401) {
        count++;
        this.sendNotification({ id, title, body, token });
        return;
      }

      // TODO: add this to log of notification that sending is failed
      // Right now I have added only console
      console.log("Error: while sending notification", error.response || error);
    }
  }

  static async getFirebaseToken() {
    if (firebaseToken) {
      return firebaseToken;
    }

    const uid = uuid();
    const token = await admin.auth().createCustomToken(uid);
    firebaseToken = token;
    return token;
  }
}

export default FirebaseService;
