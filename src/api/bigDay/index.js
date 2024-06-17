import request from "@/utils/request";

export function getBigDayApi(params) {
    return request({
      url: "/v1/diary/list/",
      method: "get",
      params
    });
  }
  

export function createBigDayApi(data) {
  return request({
    url: "/v1/diary/create/",
    method: "post",
    data,
  });
}

export function deleteBigDayApi(data) {
  return request({
    url: "/v1/diary/delete/",
    method: "delete",
    data,
  });
}
