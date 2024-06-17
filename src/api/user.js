import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/v1/user/login/",
    method: "post",
    data,
  });
}

export function register(data) {
  return request({
    url: "/v1/user/register/",
    method: "post",
    data,
  });
}

export function updateUserProfile(data) {
  return request({
    url: "/v1/user/info/",
    method: "post",
    data,
  });
}

export function getUserProfile() {
  return request({
    url: "/v1/user/info/",
    method: "get",
  });
}
