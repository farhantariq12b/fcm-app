const UserConstants = Object.freeze({

  MESSAGES: {
    SIGN_UP_FAILED: 'Something went wrong while sign up. Please try again.',
    LOGIN_FAILED: 'Something went wrong while login user. Please try again.',
    USER_DOES_NOT_EXIST: 'User does not exist',
    INVALID_DATA_TO_SIGNUP_USER: 'Invalid data to sign up user',
    USER_ALREADY_REGISTERED: 'User with this email already registered',
    INVALID_DATA_TO_LOGIN: 'Invalid data to login',
    INVALID_EMAIL: 'Invalid email provided',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token provided',
    INVALID_PASSWORD: 'Invalid password provided',
    PASSWORD_DOES_NOT_MATCH: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    TOKEN_IS_INVALID_OR_EXPIRED: 'Token is invalid or expired',
  },

  Subscription: {
    CREATION_OF_SUBSCRIPTION_FAILED: 'Something went wrong while creating subscription. Please try again.',
  },

  Notification: {
    SENDING_NOTIFICATION_FAILED: 'Something went wrong while sending notification. Please try again.',
    
  }

});

export default UserConstants;
