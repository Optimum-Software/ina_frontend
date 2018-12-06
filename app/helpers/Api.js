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
        } catch(error) {
            console.error(error);
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
        } catch(error) {
            console.log(error);
        }
    }

    callApiPut(action, data) {
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
        } catch(error) {
            console.log(error);
        }
    }


    login(username, password) {
        userData = {"username": username, "password": password}
        return(this.callApiPost("login",userData))
    }

    getDeviceById(id) {
        return(this.callApiGet("getDeviceById/" + id)
    }

    createDevice(id) {
        userData = {"id": id}
        return(this.callApiPost("createDevice", userData))
    }

    deleteDeviceById(id) {
        userData = {"id": id}
        return(this.callApiDelete("deleteDeviceById",userData))
    }

    getAllProjects() {
        return(this.callApiGet("getAllProjects"))
    }
}

const api = new Api();
export default api;
