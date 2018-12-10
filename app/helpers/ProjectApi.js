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
    //Api.callApiPost("getUserByEmail", userData).then(result => console.log(result))
    return(Api.callApiGet("getAllProjects"))

  }
}

const projectApi = new ProjectApi();
export default projectApi;