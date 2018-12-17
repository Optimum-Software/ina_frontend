import React from "react";
import Api from "./Api";
let instance = null;
class ProjectApi {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance;
  }

  getAllProjects() {
    return(Api.callApiGet("getAllProjects"))

  }
}

const projectApi = new ProjectApi();
export default projectApi;