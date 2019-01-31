import React from "react";
import { NetInfo } from "react-native";
let instance = null;
class Api {
  ip = "http://145.37.145.79:8000"
  url = this.ip + "/api/";
  mediaUrl = this.ip + "/media";

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"));
      }, ms);
      promise.then(resolve, reject);
    });
  }

  async callApiPost(action, data) {
    try {
      let response = await fetch(this.url + action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiGet(action) {
    try {
      let response = await fetch(this.url + action, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiGetSafe(action, token) {
    try {
      let response = await fetch(this.url + action, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token
        }
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiDelete(action, data) {
    try {
      let response = await fetch(this.url + action, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiPut(action, data) {
    try {
      let response = await fetch(this.url + action, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiPostForm(action, data) {
    try {
      let response = await fetch(this.url + action, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen HUPELDEPUP met de server maken"
      };
    }
  }

  async callApiUploadForProject(projectId, name, files) {
    const data = new FormData();
    for (file in files) {
      data.append(projectId + "_" + name, file);
    }
    try {
      let response = await fetch(this.url + "uploadFileForProject", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  async callApiUploadProfilePhoto(userId, name, file) {
    const data = new FormData();
    data.append(userId + "_" + name, file);
    try {
      let response = await fetch(this.url + "uploadFileForUser", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data
      });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        ntwFail: true,
        msg: "Kon geen verbinding met de server maken"
      };
    }
  }

  login(username, password) {
    userData = { username: username, password: password };
    return this.callApiPost("login", userData);
  }

  getDeviceById(id) {
    return this.callApiGet("getDeviceById/" + id);
  }

  createDevice(id) {
    userData = { id: id };
    return this.callApiPost("createDevice", userData);
  }

  deleteDeviceById(id) {
    userData = { id: id };
    return this.callApiDelete("deleteDeviceById", userData);
  }

  getAllProjects() {
    return this.callApiGet("getAllProjects");
  }

  getFileUrl(path) {
    return this.mediaUrl + path;
  }
}

const api = new Api();
export default api;
