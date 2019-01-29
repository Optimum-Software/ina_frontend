import React from "react";
import Api from "./Api";
import User from "./User";
let instance = null;
class UserApi {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  checkEmail(email) {
    userData = { email: email };
    return Api.callApiPost("getUserByEmail", userData);
  }

  getUserSettings(id) {
    return Api.callApiGet("getUserSettings/" + id)
  }

  login(username, password) {
    userData = { username: username, password: password };
    return Api.callApiPost("login", userData);
  }

  logout() {
    User.getToken().then(token => {
      return Api.callApiGetSafe("logout", token);
    });
  }

  registerUser(firstName, lastName, email, password, mobile) {
    userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: mobile,
      username: email
    };
    return Api.callApiPost("createUser", userData);
  }

  saveUserSettings(id, canNotificate) {
    userData = {
      userId: id,
      canNotificate: canNotificate
    }
    return Api.callApiPost('saveUserSettings', userData);
  }

  uploadProfilePhoto(userId, file) {
    return Api.callApiUploadProfilePhoto(userId, "ProfilePhoto", file);
  }

  editOptionalInfo(userId, organisation, jobFunction, bio) {
    userData = {
      userId: userId,
      organisation: organisation,
      function: jobFunction,
      bio: bio
    };
    return Api.callApiPost("editOptionalInfo", userData);
  }

  createDeviceId(userId, deviceId) {
    userData = {
      userId: userId,
      deviceId: deviceId
    };

    return Api.callApiPost("createDevice", userData);
  }

  notifyUser(userId, chatId) {
    userData = {
      userId: userId,
      chatId: chatId
    };

    return Api.callApiPost("sendMessageToUserById", userData);
  }

  requestNewPassword(email) {
    userData = {
      email: email
    };
    return Api.callApiPost("passwordForgotVerification", userData);
  }

  changePassword(code, newPassword, email) {
    userData = {
      code: code,
      newPassword: newPassword,
      email: email
    };
    return Api.callApiPost("changePassword", userData);
  }

  updateUser(id, firstName, lastName, bio, organisation, _function, thumbnail) {
    const data = new FormData();
    data.append("id", id);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("bio", bio);
    data.append("organisation", organisation);
    data.append("function", _function);

    photoFile = {
      uri: thumbnail,
      name: id + "_thumbnail",
      type: "multipart/form-data"
    };
    data.append("thumbnail", photoFile);
    return Api.callApiPostForm("updateUser", data);
  }

  getNotifications(id) {
    return Api.callApiGet("getNotificationByUser/"+id);
  }

  markAsRead(id) {
    console.log("hallo")
    return Api.callApiGet("markAsRead/" + id);
  }
}

const userApi = new UserApi();
export default userApi;
