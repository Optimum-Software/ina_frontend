import React from "react";
import Api from "./Api";

let instance = null;

class HomepageApi {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance;
  }


  getAllLikedProjects() {
    return (Api.callApiGet("getAllLikedProjectsById"))
  }
}

const homepageApi = new HomepageApi();
export default projectApi;