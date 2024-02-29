import API from "../../restAPI";
const Api = new API();

export default class UsersAPI {
  // Login api
  getLoginApi(payload) {
    return Api.request("/users/login", payload, "POST");
  }
  
  // get auth user
  getAuthUser(userId) {
    return Api.request("/pr-users/" + userId, [], "GET");
  }

  // get user list
  getuserList(payload) {
    return Api.request("/users-list", payload, "post");
  }

  // get user details
  getUserDetails(userId) {
    return Api.request("/pr-users/" + userId, [], "GET");
  }

  // update user details
  updateUserDetails(payload, userId) {
    return Api.request("/pr-users/" + userId, payload, "PATCH");
  }

  // delete user
  deleteUser(id, payload) {
    return Api.request("/pr-delete-users/" + id, payload, "patch");
  }
}
