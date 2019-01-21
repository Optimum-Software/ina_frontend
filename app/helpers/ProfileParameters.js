"use strict";

import React, { Component } from "react";

import { StyleSheet, View, AsyncStorage } from "react-native";
import LocalStorage from "../config/LocalStorage";
let instance = null;

class ProfileParameters {
	constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    storeUserId(userId) {
        LocalStorage.storeItem("profileUserId", userId);
    }

    getUserId() {
        return LocalStorage.retrieveItem("profileUserId");
    }
}

const profileParameters = new ProfileParameters();
export default profileParameters;