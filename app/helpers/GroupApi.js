import React from "react";
import Api from "./Api";
let instance = null;
class GroupApi {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  getGroupById(id) {
    return Api.callApiGet("getGroupById/" + id);
  }

  getGroupAdminById(id) {
    return Api.callApiGet("getGroupAdminById/" + id);
  }

  getGroupMembersById(id) {
    return Api.callApiGet("getMembersByGroupId/" + id);
  }
  getAllGroups() {
    return Api.callApiGet("getAllGroups");
  }
  getMyGroups(userId) {
    userData = { userId: userId };
    return Api.callApiPost("getMyGroups", userData);
  }

  joinGroup(userId, groupId) {
    userData = {
      userId: userId,
      groupId: groupId
    };
    return Api.callApiPost("createMember", userData);
  }

  leaveGroup(userId, groupId) {
    userData = {
      userId: userId,
      groupId: groupId
    };
    return Api.callApiDelete("deleteMember", userData);
  }

  getMember(userId, groupId) {
    userData = {
      userId: userId,
      groupId: groupId
    };
    return Api.callApiPost("getMember", userData);
  }
}

const groupApi = new GroupApi();
export default groupApi;
