import hyRequest from "..";
export function accountLogin(account: any) {
  return hyRequest.post({
    url: "/login",
    data: account,
  });
}
