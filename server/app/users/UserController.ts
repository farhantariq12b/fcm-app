import { Request, Response } from "express";

class UserController {
  static getUserDetails(req: Request, res: Response) {
    const user = { ...req.user };

    delete user.password;

    res.send(user || {})
  }
}

export default UserController;
