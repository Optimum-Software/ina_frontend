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
      "mobile": mobile,
      "username": email
    }
    return(Api.callApiPost("createUser", userData))
  }

  uploadProfilePhoto(userId, file) {
    return (Api.callApiUploadProfilePhoto(userId, "ProfilePhoto", file))
  }

  editOptionalInfo(userId, organisation, jobFunction, bio) {
    userData = {
      userId: userId,
      organisation: organisation,
      function: jobFunction,
      bio: bio
    }
    return (Api.callApiPost("editOptionalInfo", userData))
  }

  createDeviceId(userId, deviceId) {
    userData = {
      userId: userId,
      deviceId: deviceId
    }

    return (Api.callApiPost("createDevice", userData))
  }

  notifyUser(userId) {
    userData = {
      userId: userId
    }

    return (Api.callApiPost("sendMessageToUserById", userData))
  }
}

const userApi = new UserApi();
export default userApi;
