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
    createdAt
  ) {
    this.state = {
      userId: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      organisation: organisation,
      bio: bio,
      profilePhotoPath: profilePhotoPath,
      createdAt: createdAt
    };
    var localStorage = LocalStorage.getInstance();
  }

  storeUser() {
    localStorage.storeItem("userId", this.state.userId);
    localStorage.storeItem("firstName", this.state.firstName);
    localStorage.storeItem("lastName", this.state.lastName);
    localStorage.storeItem("email", this.state.email);
    localStorage.storeItem("organisation", this.state.organisation);
    localStorage.storeItem("bio", this.state.bio);
    localStorage.storeItem("profilePhotoPath", this.state.profilePhotoPath);
    localStorage.storeItem("createdAt", this.state.createdAt);
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
