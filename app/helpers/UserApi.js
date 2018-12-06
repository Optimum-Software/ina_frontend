import React from "react";
import Api from "./Api";
let instance = null;
class UserApi {
  constructor() {
    if (!instance) {
        instance = this
    }
    return instance;
  }

  checkEmail(email) {
  	userData = {"email": email}
  	return(Api.callApiPost("getUserByEmail", userData))
  }

  registerUser(firstName, lastName, email, password, mobile) {
    userData = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "mobile": mobile
    }
    return(Api.callApiPost("createUser", userData))
  }
}

const userApi = new UserApi();
export default userApi;
