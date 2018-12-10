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

    getUserId() {
        return LocalStorage.retrieveItem("userId");
    }

    getToken() {
        return LocalStorage.retrieveItem("token");
    }
}

const user = new User();
export default user;
