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
    return (Api.callApiGet("getAllFollowedProjectsByUserId/" + id))
  }

  getAllMembered(id) {
  	return (Api.callApiGet("getMembersByUserId/" + id))
  }

  getAllLiked(id) {
    return (Api.callApiGet("getLikedProjectsByUserId/" + id))
  }

}

const savedApi = new SavedApi();
export default savedApi;