import client from "./client";

const getCallCenter = (token) => client.get(`/getCallcenter.php?token=${token}`);

export default {
  getCallCenter,
};
