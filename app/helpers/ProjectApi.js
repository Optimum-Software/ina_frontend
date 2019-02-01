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

  getAllTag() {
    return Api.callApiGet("getAllTags");
  }

  getAllTags(id) {
    return Api.callApiGet("getAllProjectTagsById/" + id);
  }

  getProjectById(id) {
    return Api.callApiGet("getProjectById/" + id);
  }
  likeProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPost("likeProjectById", userData);
  }

  followProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPost("followProjectById", userData);
  }

  newestProjects() {
    return Api.callApiGet("getAllProjectsNewestFirst");
  }

  oldestProjects() {
    return Api.callApiGet("getAllProjectsOldestFirst");
  }

  mostLikedProjects() {
    return Api.callApiGet("getAllProjectsMostLikedFirst");
  }

  mostFollowedProjects() {
    return Api.callApiGet("getAllProjectsMostFollowsFirst");
  }

  getSwipeProjects(userId) {
    return Api.callApiGet("getSwipeProjects/"+ userId);
  }

  createProject(
    creatorId,
    name,
    desc,
    location,
    beginDate,
    endDate,
    thumbnailUri,
    thumbnailName,
    documents,
    tags
  ) {
    const data = new FormData();

    data.append("creatorId", creatorId);
    data.append("name", name);
    data.append("desc", desc);
    data.append("location", location);
    data.append("beginDate", beginDate);
    data.append("endDate", endDate);
    console.log("TAGS VOOR HET AANMAKEN VAN PROJECT");
    console.log(tags);
    let count = 0;
    tags.forEach(tag => {
      data.append("#" + count, tag.name);
      count++;
    });

    projectThumbnail = {
      uri: thumbnailUri,
      name: thumbnailName,
      type: "multipart/form-data"
    };
    data.append("thumbnail", projectThumbnail);

    for (i in documents) {
      document = documents[i];
      console.log(document);
      newDoc = {
        uri: document.uri,
        name: document.name,
        type: "multipart/form-data",
        size: document.size
      };
      data.append("" + newDoc.name, newDoc);
    }
    return Api.callApiPostForm("createProject", data);
  }

  editProject(
    projectId,
    name,
    desc,
    location,
    beginDate,
    endDate,
    thumbnailUri,
    thumbnailName,
    documents,
    tags
  ) {
    const data = new FormData();

    data.append("projectId", projectId);
    data.append("name", name);
    data.append("desc", desc);
    data.append("location", location);
    data.append("beginDate", beginDate);
    data.append("endDate", endDate);

    let count = 0;
    tags.forEach(tag => {
      data.append("#" + count, tag.name);
      count++;
    });

    projectThumbnail = {
      uri: thumbnailUri,
      name: thumbnailName,
      type: "multipart/form-data"
    };
    data.append("thumbnail", projectThumbnail);

    for (i in documents) {
      document = documents[i];
      let newDoc = {
        uri: document.uri,
        name: document.name,
        type: "multipart/form-data",
        size: document.size
      };
      console.log(newDoc);

      data.append("" + newDoc.name, newDoc);
    }
    return Api.callApiPostForm("editProject", data);
  }

  getProjectMembersById(id) {
    return Api.callApiGet("getMembersByProjectId/" + id);
  }

  joinProject(userId, projectId) {
    userData = {
      userId: userId,
      projectId: projectId
    };
    return Api.callApiPost("createMember", userData);
  }

  leaveProject(userId, projectId) {
    userData = {
      userId: userId,
      projectId: projectId
    };
    return Api.callApiDelete("deleteMember", userData);
  }

  checkIfMember(userId, projectId) {
    userData = {
      userId: userId,
      projectId: projectId
    };
    return Api.callApiPost("getMember", userData);
  }

  updateProject(projectId, userId, title, content) {
    userData = {
      project: projectId,
      user: userId,
      title: title,
      content: content
    };
    return Api.callApiPost("addProjectUpdate", userData);
  }

  getUpdatesForProject(projectId) {
    return Api.callApiGet("getProjectUpdatesByProjectId/" + projectId);
  }

  getProjectByTag(tag) {
    userData = {
      tagName: tag
    };
    return Api.callApiPost("getProjectsByTag", userData);
  }
}

const projectApi = new ProjectApi();
export default projectApi;
