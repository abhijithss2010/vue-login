import axios from "axios";

export default axios.create({
  baseURL: "https://079756d9-dbd1-4d35-a27a-47e8e6b6f067.mock.pstmn.io",
  headers: {
    "Content-type": "application/json",
    "x-mock-match-request-body": true,
  },
});
