import http from "./http-common";
import SigninData from "@/models/signin-interface";

class LoginService {
  signin(data: SigninData) {
    return http.post("/signin", data);
  }
}

export default new LoginService();
