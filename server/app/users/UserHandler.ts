import { SignUpRequestBody } from "../../interfaces/Auth";
import { User } from "../../models/User";

class UserHandler {
  static findUserByEmail(email: string | undefined): Promise<any> {
    return User.findOne({ where: { email }, raw: true });
  }

  static createUser(data: SignUpRequestBody): Promise<any> {
    return User.create(data);
  }

  static setAccessToken(userId: number, accessToken: string, refreshToken: string): Promise<any> {
    return User.update({ accessToken, refreshToken }, { where: { id: userId } });
  }

  static getAuthenticateUser(userId: number, email = "", authToken: string): Promise<any> {
    return User.findOne({
      where: {
        id: userId,
        email,
        accessToken: authToken,
      }
    });
  }

  static setUserPassword(userId: number, password: string): Promise<any> {
    return User.update({ password }, { where: { id: userId } });
  }
}

export default UserHandler;
