import { post } from "axios";
import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:5000/api/";

const IMAGE_API_URL = BASE_URL + "images/upload";

const fileUpload = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return post(IMAGE_API_URL, formData, config);
};

const CvService = {
  fileUpload,
};
export default CvService;
