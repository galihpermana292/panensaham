import axios from "axios";

const API = process.env.REACT_APP_API_MODE;
export const Register = async (res) => {
  await axios({
    method: "post",
    url: "http://103.102.177.243:20221/api/v1/register",
    headers: {
      Authorization:
        "Bearer mHxe4MEBflei4zJIFIgTexp5Q4f7lo8Nv6SdGdtpNDF4g5GhMTtw6h4ZSjRc7TQN",
    },
    data: {
      userid: "useridTest",
    },
  })
    .then((response) => {
      res(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
