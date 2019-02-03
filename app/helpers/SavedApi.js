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
    return (Api.callApiGetSafe("getAllFollowedProjectsByUserId/" + id))
  }

  getAllMembered(id) {
    return (Api.callApiGetSafe("getMembersByUserId/" + id))
  }

  getAllLiked(id) {
    return (Api.callApiGetSafe("getLikedProjectsByUserId/" + id))
  }

}

const savedApi = new SavedApi();
export default savedApi;