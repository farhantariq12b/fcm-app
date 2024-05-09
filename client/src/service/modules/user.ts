import api from "..";

class UserService {

  static getUserDetails() {
    return api({
      method: 'GET',
      url: '/me',
    })
  }

}

export default UserService;
