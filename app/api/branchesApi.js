import client from "./client";

const branchesApi = () => {

    return client.get("https://squretehad.com/client/api/getServers.php");
};
export default {
    branchesApi,
};
