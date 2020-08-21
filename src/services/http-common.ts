import axios from "axios";
import { Config } from "@/constants/configurations";

export default axios.create({
  baseURL: Config.baseURL,
  headers: {
    "Content-type": "application/json",
    "x-mock-match-request-body": true
  }
});
