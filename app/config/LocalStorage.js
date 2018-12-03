import React from "react";
import { AsyncStorage } from "react-native";

export default class LocalStorage {
  static getInstance() {
    if (LocalStorage.instance == null) {
      LocalStorage.instance = new LocalStorage();
    }

    return LocalStorage.instance;
  }

  // Store key-value pairs in async storage
  async storeItem(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  // Retrieve value by key from async storage
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }
}
