import React from "react";
import Api from "./Api";

let instance = null;

class SavedApi {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance;
  }

  getAllFollows(id) {
    return (Api.callApiGet("getAllFollowedProjectsById/" + id))
  }

}

const savedApi = new SavedApi();
export default savedApi;