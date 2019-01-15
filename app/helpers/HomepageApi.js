import React from "react";
import Api from "./Api";

let instance = null;

class HomepageApi {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance;
  }


  getAllLikedProjects() {
    return (Api.callApiGet("getAllLikedProjectsById"))
  }

  searchTags(term) {
  	return (Api.callApiPost("searchForTags", {searchTerm: term}))
  }

  searchProjects(term) {
  	return (Api.callApiPost("searchForProjects", {searchTerm: term}))
  }
}

const homepageApi = new HomepageApi();
export default homepageApi;