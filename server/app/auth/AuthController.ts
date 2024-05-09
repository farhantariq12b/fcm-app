import { Request, Response } from "express";
import AuthManager from "./AuthManager";
import { Exception } from "../../interfaces/Exception";
import Validators from "../../utils/Validators";
import ErrorCodes from "../../constants/ErrorCodes";
import UserConstants from "../../constants/UserConstants";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const user = await AuthManager.login(req.body);

      res.json({
        success: true,
        data: user
      });
    } catch (err) {
      const error = err as Exception;

      console.log(`login:: Request to login user failed. data:: `, req.body, err);

      return res
        .status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: error.reportError ? error.message : UserConstants.MESSAGES.LOGIN_FAILED,
        });
    }
  }

  static async signUp(req: Request, res: Response) {
    try {
      const user = await AuthManager.signup(req.body);

      res.json({
        success: true,
        data: user,
      });
    } catch (err: any) {
      const error = err as Exception;

      console.log(`signup:: Request to sign up user failed. data:: `, req.body, err);

      return res
        .status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: error.reportError ? error.message : UserConstants.MESSAGES.SIGN_UP_FAILED,
        });
    }
  }
}

export default AuthController;