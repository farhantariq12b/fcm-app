import ErrorCodes from "../../constants/ErrorCodes";
import UserConstants from "../../constants/UserConstants";
import Exception from "../../helpers/Exception";
import Token from "../../helpers/Token";
import { LoginRequestBody, SignUpRequestBody, User } from "../../interfaces/Auth";
import Validators from "../../utils/Validators";
import UserHandler from "../users/UserHandler";
import AuthUtil from "./AuthUtil";
import bcrypt from 'bcrypt';

class AuthManager {

  static async signup(data: SignUpRequestBody) {

    console.log(`signup:: Request to signup user. data:: `, data);

    AuthUtil.validateSignUpRequest(data);

    let user;

    if (!Validators.isValidateEmail(data.email)) {
      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, 400, true);
    }

    user = await UserHandler.findUserByEmail(data.email);

    AuthUtil.validateUserForSignUp(user)

    const createdUser: User = await UserHandler.createUser(data);

    const password = await AuthUtil.createHashedPassword(data.password || '');

    await UserHandler.setUserPassword(createdUser.id!, password);

    console.log(`signup:: User successfully signed up. data:: `, createdUser);

    const { accessToken, refreshToken } = await AuthManager.setAccessToken(createdUser);

    const { password: originalPassword, ...userData } = data;

    return { ...userData, id: createdUser.id, accessToken, refreshToken };

  }

  static async login(data: LoginRequestBody) {

    console.log(`login:: Request to login user. data:: `, data);

    let user;

    AuthUtil.validateLoginRequest(data);

    if (Validators.isValidateEmail(data.email)) {

      user = await UserHandler.findUserByEmail(data.email);

    }

    AuthUtil.validateUserToAuthenticate(user);

    const passwordMatched = await bcrypt.compare(data.password || '', user.password);

    if (!passwordMatched) {

      console.log(`login:: Password does not match. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH, ErrorCodes.UNAUTHORIZED, true);

    }

    console.log(`login:: User successfully login. data:: `, data);

    const { accessToken, refreshToken } = await AuthManager.setAccessToken(user);

    delete user.password
    return { ...user, accessToken, refreshToken };

  }


  static async setAccessToken(user: User) {
    if (!user.id) return user;

    console.log(`setAccessToken:: Setting access token of user. user:: `, user);

    const accessToken = Token.getLoginToken(user);

    const refreshToken = Token.getRefreshToken(user);

    await UserHandler.setAccessToken(user.id, accessToken, refreshToken);

    console.log(`setAccessToken:: access token of user successfully set. user:: `, user);

    return { ...user, accessToken, refreshToken };

  }

}

export default AuthManager;