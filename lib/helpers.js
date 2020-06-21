import axios from "axios";
import * as querystring from "querystring";
import * as jwtDecode from "jwt-decode";

let tapiToken = null;

const isTokenValid = (token) => {
  if (!token) {
    return false;
  } else {
    const parsedToken = jwtDecode(tapiToken);
    const exp = parsedToken.exp;
    if (Date.now() >= exp * 1000) {
      return false;
    } else {
      return true;
    }
  }
};

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
  if (!isTokenValid(tapiToken)) {
    await getTapiToken();
  }

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

export async function getTapiLinesByName(name) {
  if (!isTokenValid(tapiToken)) {
    await getTapiToken();
  }

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tapiToken}`,
    },
  };

  const result = await axios.get(
    `https://platform.whereismytransport.com/api/lines?name=${name}&limit=5`,
    headers
  );

  const lines = result.data;
  return lines;
}

let allFetchedLines = [];

export async function getAllLines() {
  console.log(tapiToken);
  console.log(allFetchedLines.length);
  if (allFetchedLines.length > 0) {
    console.log(allFetchedLines.length)
    return allFetchedLines;
  }

  if (!isTokenValid(tapiToken)) {
    await getTapiToken();
  }

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tapiToken}`,
    },
  };

  let allLines = [];
  let offset = 0;
  let limit = 100;
  while (true) {
    const result = await axios.get(
      `https://platform.whereismytransport.com/api/lines?offset=${offset}&limit=${limit}`,
      headers
    );
    const lines = result.data;
    allLines = allLines.concat(lines);
    offset = offset + limit;
    if (lines.length < 100) {
      break;
    }
  }

  allFetchedLines = allLines;
  return allLines;
}