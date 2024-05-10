export default {
  port: process.env.PORT!,
  secretKey: process.env.JWT_SECRET_KEY!,
  timeouts: {
    login: process.env.JWT_LOGIN_EXPIRY_TIME!,
    refreshToken: process.env.JWT_REFRESH_EXPIRY_TIME!,
  },
  serverKey: process.env.FIREBASE_CLOUD_MESSAGING_SERVER_KEY
};
