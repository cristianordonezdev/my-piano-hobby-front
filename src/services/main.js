import axios from "axios";
import config from "@/services/config";

export default {
  getRepertoire() {
    return axios
      .get(`${config.api_route}/get-all`)
      .then((res) => {
        return res.data.rows;
      })
      .catch((error) => {
        return error.response;
      });
  },
  addOne(data) {
    return axios
      .post(`${config.api_route}/add-one`, data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  },
};
