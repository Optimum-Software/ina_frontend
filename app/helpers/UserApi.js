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
    User.getToken().then(token => {
      return Api.callApiGetSafe("getUserSettings/" + id, token)
    })
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
    User.getToken().then(token => {
      return Api.callApiPostSafe('saveUserSettings', token, userData);
    })
  }

  uploadProfilePhoto(userId, file) {
    User.getToken().then(token => {
      return Api.callApiUploadProfilePhoto(userId, token, "ProfilePhoto", file);
    })
    
  }

  createDeviceId(userId, deviceId) {
    userData = {
      userId: userId,
      deviceId: deviceId
    };
    User.getToken().then(token => {
      return Api.callApiPostSafe("createDevice", token, userData);
    })
  }

  notifyUser(userId, chatId) {
    userData = {
      userId: userId,
      chatId: chatId
    };
    User.getToken().then(token => {
      return Api.callApiPostSafe("sendMessageToUserById", token, userData);
    })
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
    User.getToken().then(token => {
      return Api.callApiPostFormSafe("updateUser", data, token);
    })
  }

  editOptionalInfo(id, bio, organisation, _function) {
    userData = {
      userId: id,
      bio: bio,
      organisation: organisation,
      function: _function
    }
    User.getToken().then(token => {
      return Api.callApiPost("editOptionalInfo", userData, token)
    })
  }

  getNotifications(id) {
    User.getToken().then(token => {
      return Api.callApiGetSafe("getNotificationByUser/"+id, token);
    })
  }

  markAsRead(id) {
    User.getToken().then(token => {
      return Api.callApiGetSafe("markAsRead/" + id, token);
    })
  }
}

const userApi = new UserApi();
export default userApi;
