"use strict";

import React, { Component } from "react";

import { StyleSheet, View, AsyncStorage } from "react-native";
import LocalStorage from "../config/LocalStorage";

export default class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    organisation,
    bio,
    profilePhotoPath,
    createdAt,
    token
  ) {
    this.state = {
      userId: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      organisation: organisation,
      bio: bio,
      profilePhotoPath: profilePhotoPath,
      createdAt: createdAt,
      token: token
    };
    var localStorage = LocalStorage.getInstance();
  }

  storeUser(
    userId,
    firstName,
    lastName,
    email,
    organisation,
    bio,
    profilePhotoPath,
    createdAt,
    token
  ) {
    localStorage.storeItem("userId", userId);
    localStorage.storeItem("firstName", firstName);
    localStorage.storeItem("lastName", lastName);
    localStorage.storeItem("email", email);
    localStorage.storeItem("organisation", organisation);
    localStorage.storeItem("bio", bio);
    localStorage.storeItem("profilePhotoPath", profilePhotoPath);
    localStorage.storeItem("createdAt", createdAt);
    localStorage.storeItem("token", createdAt);

    this.storeSessionToken();
  }

  storeSessionToken(token) {
    localStorage.storeItem("token", token);
  }

  getUserId() {
    return localStorage.retrieveItem("userId");
  }

  getFirstName() {
    return localStorage.retrieveItem("firstName");
  }

  getLastName() {
    return localStorage.retrieveItem("lastName");
  }

  getFullName() {
    return this.getFirstName() + " " + this.getLastName();
  }

  getEmail() {
    return localStorage.retrieveItem("email");
  }

  getOrganisation() {
    return localStorage.retrieveItem("organisation");
  }

  getBio() {
    return localStorage.retrieveItem("bio");
  }

  getProfilePhotoPath() {
    return localStorage.retrieveItem("profilePhotoPath");
  }

  getCreatedAt() {
    return localStorage.retrieveItem("createdAt");
  }
}
