import React from "react";
import { NetInfo } from "react-native";
let instance = null;
class Api {
    url = "http:/145.37.145.110:8000/api/";

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
            let response = await this.timeout(
                3000,
                fetch(this.url + action, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
            );
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
            let response = await this.timeout(
                3000,
                fetch(this.url + action, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            );
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
            let response = await this.timeout(
                3000,
                fetch(this.url + action, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
            );
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
            let response = await this.timeout(
                3000,
                fetch(this.url + action, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
            );
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            return {
                ntwFail: true,
                msg: "Kon geen verbinding met de server maken"
            };
        }
    }

    async callApiUpload(project, name, file) {
        const data = new FormData();
        data.append(project + "_" + name, file);
        try {
            let response = await this.timeout(
                3000,
                fetch(this.url + "uploadFile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: data
                })
            );
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
}

const api = new Api();
export default api;
