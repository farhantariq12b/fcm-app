import api from "..";
import { LoginBody, SingUpBody } from "../../interfaces/Auth";

class AuthService {

  static login(data: LoginBody) {
    return api({
      method: 'post',
      url: '/auth/login',
      data
    })
  }


  static signup(data: SingUpBody) {
    return api({
      method: 'post',
      url: `/auth/sign-up`,
      data
    })
  }
}

export default AuthService;
