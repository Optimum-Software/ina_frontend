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
    User.getToken().then(token => {
      return (Api.callApiGetSafe("getAllFollowedProjectsByUserId/" + id, token))
    })
  }

  getAllMembered(id) {
    User.getToken().then(token => {
      return (Api.callApiGetSafe("getMembersByUserId/" + id, token))
    })
  }

  getAllLiked(id) {
    User.getToken().then(token => {
      return (Api.callApiGetSafe("getLikedProjectsByUserId/" + id, token))
    })
  }

}

const savedApi = new SavedApi();
export default savedApi;