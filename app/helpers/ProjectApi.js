import React from "react";
import Api from "./Api";

let instance = null;

class ProjectApi {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getAllProjects() {
    return Api.callApiGet("getAllProjects");
  }

<<<<<<< HEAD
  likeProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPost("likeProjectById", userData);
  }

  followProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPost("followProjectById");
=======
  getAllTags(id) {
    return (Api.callApiGet("getAllProjectTagsById/" + id))
  }

  likeProject(id,userId) {
    userData = {"id": id,"userId": userId}
    return (Api.callApiPost("likeProjectById", userData))
  }

  followProject(id,userId) {
    userData = {"id": id,"userId": userId}
    return (Api.callApiPost("followProjectById",userData))
>>>>>>> upstream/master
  }
}

const projectApi = new ProjectApi();
export default projectApi;
