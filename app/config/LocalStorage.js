import React from "react";
import { AsyncStorage } from "react-native";
let instance = null;

class LocalStorage {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
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
const localStorage = new LocalStorage();
export default localStorage;
