import api from "..";
import { LoginBody, SingUpBody } from "../../interfaces/Auth";

class AuthService {

  static login(data: LoginBody) {
    return api({
      method: 'post',
      url: '/login',
      data
    })
  }


  static signup(data: SingUpBody) {
    return api({
      method: 'post',
      url: `/sign-up`,
      data
    })
  }
}

export default AuthService;
