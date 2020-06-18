import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import axios from 'axios';
import * as querystring from 'querystring';

let tapiToken = null;

async function getTapiToken() {
    console.log('getTapiToken');
    const body = querystring.stringify({
        client_id: '531434b5-c748-47db-8023-ff88718e5228',
        client_secret: '8CUUBAcIcZYvksBo4KP7orFsv+iYXbsve2h/n/13JK0=',
        grant_type: 'client_credentials',
        scope: 'transportapi:all transportapi:linesshape:read transportapi:linesgeometry:read',
      });
      const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      };

    const result = await axios
        .post('https://identity.whereismytransport.com/connect/token', body, config);
        const token = result.data.access_token;
        tapiToken = token;
        return token;
}

const dictionary = {};

async function getTapiLineName(lineId) {
  console.log('getTapiLineName');
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tapiToken}`,
    },
  };
  const result = await axios
    .get(`https://platform.whereismytransport.com/api/lines/${lineId}`, headers)

  const line = result.data;
  dictionary[lineId] = line;
  return line;
}

const Line = (props) => {
  const router = useRouter()
  const { id, pid } = router.query

  return (
    <>
    <p>TAPI Line: {id}</p>
    <p>TAPI Line Name: {props.line.name}</p>
    <p>Device ID: {pid}</p>
    <p>The time is: {props.timeData.datetime}</p>
    </>
  )
}

export async function getServerSideProps(context) {
    const url = 'http://worldtimeapi.org/api/timezone/Africa/Johannesburg';
    const result = await fetch(url);
    const timeData = await result.json();
    const lineId = context.query.id;

    if (tapiToken == null) {
        await getTapiToken();
    }
    else {
        console.log("has valid token");
    }
    if (!dictionary[lineId]) {
        await getTapiLineName(lineId);
    } else {
        console.log("cache hit");
    }
    //const line = await getTapiLineName('T9htbUaZakysEKu4AXlQeg');
    const line = dictionary[lineId];
    
    return {
      props: { timeData: timeData, line: line } // will be passed to the page component as props
    }
  }

export default Line