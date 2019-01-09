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
}

const groupApi = new GroupApi();
export default groupApi;
