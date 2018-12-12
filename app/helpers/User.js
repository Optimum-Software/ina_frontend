"use strict";

import React, { Component } from "react";

import { StyleSheet, View, AsyncStorage } from "react-native";
import LocalStorage from "../config/LocalStorage";
let instance = null;

class User {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    storeUserId(userId) {
        LocalStorage.storeItem("userId", userId);
    }

    storeToken(token) {
        LocalStorage.storeItem("token", token);
    }

    storeDeviceId(device) {
        LocalStorage.storeItem("deviceId", device)
    }

    getUserId() {
        return LocalStorage.retrieveItem("userId");
    }

    getToken() {
        return LocalStorage.retrieveItem("token");
    }

    getDeviceId() {
        return LocalStorage.retrieveItem("deviceId");
    }
}

const user = new User();
export default user;
