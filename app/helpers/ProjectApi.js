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
    return (Api.callApiGet("getAllProjects"))
  }

  likeProject(id,userId) {
    userData = {"id": id,"userId": userId}
    return (Api.callApiPost("likeProjectById", userData))
  }

  followProject() {
    return (Api.callApiGet("followProject"))
  }
}

const projectApi = new ProjectApi();
export default projectApi;