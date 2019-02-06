import React from "react";
import Api from "./Api";
import User from "./User";

let instance = null;

class ProjectApi {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getProjects(userId, filter, optional = null) {
    if (userId != null) {
      userData = { userId: userId, filter: filter };
      if (filter == "search") {
        userData["searchTerm"] = optional;
      }
      if (filter == "tag") {
        userData["tagName"] = optional;
      }
      return Api.callApiPostSafe("getProjects", userData);
    } else {
      userData = { filter: filter };
      if (filter == "search") {
        userData["searchTerm"] = optional;
      }
      if (filter == "tag") {
        userData["tagName"] = optional;
      }
      return Api.callApiPost("getProjectsNotLoggedIn", userData);
    }
  }

  getAllTags() {
    return Api.callApiGet("getAllTags");
  }

  getProjectById(userId, projectId) {
    if (userId != null) {
      return Api.callApiGetSafe("getProjectById/" + userId + "/" + projectId);
    } else {
      return Api.callApiGet("getProjectByIdNotLoggedIn/" + projectId);
    }
  }

  likeProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPostSafe("likeProjectById", userData);
  }

  setCanNotificate(canNotificate, userId, projectId) {
    userData = {
      canNotificate: canNotificate,
      userId: userId,
      projectId: projectId
    };
    return Api.callApiPostSafe("setCanNotificate", userData);
  }

  unlikeProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPostSafe("unlikeProjectById", userData);
  }

  followProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPostSafe("followProjectById", userData);
  }

  unfollowProject(id, userId) {
    userData = { id: id, userId: userId };
    return Api.callApiPostSafe("unfollowProjectById", userData);
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
    return Api.callApiGetSafe("getSwipeProjects/" + userId);
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
      newDoc = {
        uri: document.uri,
        name: document.name,
        type: "multipart/form-data",
        size: document.size
      };
      data.append("" + newDoc.name, newDoc);
    }
    return Api.callApiPostFormSafe("createProject", data);
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

      data.append("" + newDoc.name, newDoc);
    }
    return Api.callApiPostFormSafe("editProject", data);
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

  // checkIfMember(userId, projectId) {
  //   userData = {
  //     userId: userId,
  //     projectId: projectId
  //   };
  //   return Api.callApiPost("getMember", userData);
  // }

  checkIfLiked(userId, projectId) {
    userData = {
      userId: userId,
      projectId: projectId
    };
    return Api.callApiGetSafe(
      "checkIfProjectLiked/" + projectId + "/" + userId
    );
  }

  checkIfLiked(userId, projectId) {
    return Api.callApiGetSafe(
      "checkIfProjectLiked/" + userId + "/" + projectId
    );
  }

  checkIfFollowed(userId, projectId) {
    return Api.callApiGetSafe("checkIfFollowed/" + userId + "/" + projectId);
  }
  updateProject(projectId, userId, title, content) {
    console.log(projectId)
    userData = {
      project: projectId,
      user: userId,
      title: title,
      content: content
    };
    return Api.callApiPostSafe("addProjectUpdate", userData);
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
