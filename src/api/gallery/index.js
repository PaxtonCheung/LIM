import request from "@/utils/request";

export function getGalleryListApi(params) {
    return request({
      url: "/v1/photo_album/list/",
      method: "get",
      params
    });
  }
  

export function postGalleryApi(data) {
  return request({
    url: "/v1/photo_album/create/",
    method: "post",
    data,
  });
}

export function deleteGalleryApi(data) {
  return request({
    url: "/v1/photo_album/delete/",
    method: "delete",
    data,
  });
}
