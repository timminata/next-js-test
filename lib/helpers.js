
import axios from "axios";
import * as querystring from "querystring";


let tapiToken = null;

export async function getTapiToken() {
  const body = querystring.stringify({
    client_id: "531434b5-c748-47db-8023-ff88718e5228",
    client_secret: "8CUUBAcIcZYvksBo4KP7orFsv+iYXbsve2h/n/13JK0=",
    grant_type: "client_credentials",
    scope:
      "transportapi:all transportapi:linesshape:read transportapi:linesgeometry:read",
  });
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  };

  const result = await axios.post(
    "https://identity.whereismytransport.com/connect/token",
    body,
    config
  );
  
  const token = result.data.access_token;
  tapiToken = token;
  return token;
}

export async function getTapiLine(lineId) {
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tapiToken}`,
    },
  };
  const result = await axios.get(
    `https://platform.whereismytransport.com/api/lines/${lineId}`,
    headers
  );

  const line = result.data;
  return line;
}
