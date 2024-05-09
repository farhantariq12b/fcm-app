import { Request, NextFunction, Response } from "express";
import Validators from "../utils/Validators";
import UserConstants from "../constants/UserConstants";
import ErrorCodes from "../constants/ErrorCodes";
import Exception from "../helpers/Exception";
import jwt from "jsonwebtoken";
import config from "../helpers/config";
import { User } from "../models/User";
import UserHandler from "../app/users/UserHandler";

class Authentication {


  static async authenticate(req: Request, res: Response, next: NextFunction) {

    try {
      const { authorization = '' } = req.headers;


      const tokenSplitted = Validators.isValidStr(authorization) ? authorization.split(' ') : null;

      if (!Array.isArray(tokenSplitted) || tokenSplitted.length < 1) {

        console.log(tokenSplitted?.length);

        console.log(`authenticate:: Token is invalid. token:: `, tokenSplitted);

        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, true);

      }

      const token = tokenSplitted[1];

      const decoded = jwt.verify(token, config.secretKey) as User;

      if (!decoded || !decoded.id || !decoded.email) {

        console.log(`authenticate:: Token is invalid or expired. token:: ${token} decoded:: `, decoded);

        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, true);

      }



      const user: User = await UserHandler.getAuthenticateUser(decoded.id, decoded.email, token);

      if (!user) {

        console.log(`authenticate:: Token is invalid, no user found. token:: ${token} decoded:: `, decoded);

        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, true);

      }

      req.user = user.toJSON();

      next();

    } catch (error) {

      return res.status(ErrorCodes.UNAUTHORIZED).json({
        message: UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED
      });

    }

  }}

export default Authentication