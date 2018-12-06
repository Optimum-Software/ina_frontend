import React from "react";
import { NetInfo } from "react-native";

export default class Api {
  static instance = null;

  url = "http://145.37.153.108:8000/api/";

  static getInstance() {
    if (Api.instance == null) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  callApiPost(action, data, callBack = response => console.log(response)) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        fetch(this.url + action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(responseJson => {
            callBack(responseJson);
          })
          .catch(error => {
            callBack(error);
          });
      } else {
        alert("Geen internet verbinding");
      }
    });
  }

  callApiGet(action, method, callBack = response => console.log(response)) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (method == "GET") {
          fetch(this.url + action, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(responseJson => callBack(responseJson))
            .catch(error => {
              callBack(error);
            });
        } else {
          console.log("Only applicable to GET reguests");
        }
      }
    });
  }

  callApiDelete(
    action,
    method,
    data,
    callBack = response => console.log(response)
  ) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (method == "DELETE") {
          fetch(this.url + action, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(responseJson => callBack(responseJson))
            .catch(error => {
              callBack(error);
            });
        } else {
          console.log("Only applicable to DELETE reguests");
        }
      }
    });
  }

  callApiPut(
    action,
    method,
    data,
    callBack = response => console.log(response)
  ) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (method == "PUT") {
          fetch(this.url + action, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(responseJson => callBack(responseJson))
            .catch(error => {
              callBack(error);
            });
        } else {
          console.log("Only applicable to PUT reguests");
        }
      }
    });
  }

  // login(username, password) {
  //   userData = { username: username, password: password };
  //   api.callApiPost("login", "POST", userData, response => {
  //     if (response["bool"] == "true") {
  //       return (data = { msg: response["msg"], user: response["user"] });
  //     } else {
  //       return (data = { msg: response["msg"] });
  //     }
  //   });
  // }

  getDeviceById(id) {
    api.callApiGet("getDeviceById" + id, "GET", response => {
      if (response["bool"] == true) {
        data = { msg: response["msg"], user: response["user"] };
      } else {
        return (data = { msg: response["msg"] });
      }
    });
  }

  createDevice(id) {
    userData = { id: id };
    api.callApiPost("createDevice", "POST", userData, response => {
      if (response["bool"] == true) {
        this.setUser((data = { msg: response["msg"], id: response["id"] }));
      } else {
        return (data = { msg: response["msg"] });
      }
    });
  }

  deleteDeviceById(id) {
    userData = { id: id };
    api.callApiDelete("deleteDeviceById", "DELETE", userData, response => {
      if (response["bool"] == true) {
        this.setUser((data = { msg: response["msg"] }));
      } else {
        return (data = { msg: response["msg"] });
      }
    });
  }

  getAllProjects() {
    api.callApiGet("getAllProjects", "GET", response => {
      if (response["bool"] == true) {
        this
          .setUser
          //return data = {"projects": response["projects"], "msg": response["msg"]}
          ();
      } else {
        //return data = {"msg": response["msg"]}
      }
    });
  }
}
