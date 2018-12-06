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
  	//Api.callApiPost("getUserByEmail", userData).then(result => console.log(result))
  	return(Api.callApiPost("getUserByEmail", userData))
    
  }
}

const userApi = new UserApi();
export default userApi;
