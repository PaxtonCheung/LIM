import request from "@/utils/request";

export function getMessageBoardListApi(params) {
    return request({
      url: "/v1/message_board/list/",
      method: "get",
      params
    });
  }
  

export function postMessageBoardApi(data) {
  return request({
    url: "/v1/message_board/create/",
    method: "post",
    data,
  });
}

export function deleteMessageBoardApi(data) {
  return request({
    url: "/v1/message_board/delete/",
    method: "delete",
    data,
  });
}
