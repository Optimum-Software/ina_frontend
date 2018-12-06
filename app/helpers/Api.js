import React from "react";
import {NetInfo} from "react-native";
let instance = null;
class Api {
    url = "http://145.37.145.158:8000/api/";

    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }

    async callApiPost(action, data) {
        try {
            let response = await fetch(
                this.url + action, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
            });
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
        
    }

    async getMoviesFromApi() {
      try {
        let response = await fetch(
          'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();
        return responseJson.movies;
      } catch (error) {
        console.error(error);
      }
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
                    console.log("Only applicable to GET reguests")
                }
            }
        });
    }

    callApiDelete(action, method, data, callBack = response => console.log(response)) {
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
                    console.log("Only applicable to DELETE reguests")
                }
            }
        });
    }

    callApiPut(action, method, data, callBack = response => console.log(response)) {
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
                    console.log("Only applicable to PUT reguests")
                }
            }
        });
    }


    login(username, password) {
        userData = {"username": username, "password": password}
        this.callApiPost("login", "POST", userData, response => {

            if (response["bool"] == "true") {
                return data = {"msg": response["msg"], "user": response["user"]}
            } else {
                return data = {"msg": response["msg"]}
            }
        });
    }

    getDeviceById(id) {
        this.callApiGet("getDeviceById" + id, "GET", response => {

            if (response["bool"] == true) {
                data = {"msg": response["msg"], "user": response["user"]}
            } else {
                return data = {"msg": response["msg"]}
            }
        });
    }

    createDevice(id) {
        userData = {"id": id}
        this.callApiPost("createDevice", "POST", userData, response => {

            if (response["bool"] == true) {
                this.setUser(
                    data = {"msg": response["msg"], "id": response["id"]}
                );
            } else {
                return data = {"msg": response["msg"]}
            }
        });
    }

    deleteDeviceById(id) {
        userData = {"id": id}
        this.callApiDelete("deleteDeviceById", "DELETE", userData, response => {

            if (response["bool"] == true) {
                this.setUser(
                    data = {"msg": response["msg"]}
                );
            } else {
                return data = {"msg": response["msg"]}
            }
        });
    }

    getAllProjects() {
        this.callApiGet("getAllProjects", "GET", response => {

            if (response["bool"] == true) {
                this.setUser(
                    //return data = {"projects": response["projects"], "msg": response["msg"]}
                );
            } else {
                //return data = {"msg": response["msg"]}
            }
        });
    }
}

const api = new Api();
export default api;
