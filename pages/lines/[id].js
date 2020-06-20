import { useRouter } from "next/router";
import fetch from "node-fetch";
import Head from "next/head";
import { getTapiToken, getTapiLine } from "../../lib/helpers";

let tapiToken = null;

const dictionary = {};

const Line = (props) => {
  const router = useRouter();
  const { id, pid } = router.query;
  const line = props.line;
  const lineColour = line.colour;

  return (
    <div className="container">
      <Head>
        <title>{props.line.name.substring(0, 65)}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Your one stop shop for transport data!"
        ></meta>
        <meta property="og:title" content={line.agency.name} />
        <meta
          property="og:url"
          content={`http://trewartha.za.net/lines/${id}`}
        />
        <meta property="og:description" content={`Transport line ${props.line.name}`}></meta>
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/765843200691019776/WB3R_p3__400x400.jpg"
        ></meta>
      </Head>
      <div className="card">
        <h2>{line.agency.name}</h2>
        <p>
          <b>ID:</b> {id}
        </p>
        <p>
          <b>Name:</b> {props.line.name}
        </p>
        <p>
          <b>Shortname:</b> {props.line.shortName}
        </p>
        <p>
          <b>Mode:</b> {props.line.mode}
        </p>
        <p>
          <b>Device ID:</b> {pid}
        </p>
        <p>
          <b>Time:</b> {props.timeData.datetime}
        </p>
      </div>

      <footer>
  <svg viewBox="0 -20 700 110" width="100%" height="110" preserveAspectRatio="none">
    <path transform="translate(0, -20)" d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700" fill="#CEB964" />
    <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" fill="#E6E7E9" />
  </svg>
</footer>

      <style jsx>{`
        h2 {
          text-align: center;
        }
        .container {
          min-height: 85vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .card {
          padding: 1rem;
          border: 3px solid #4f5457;
          border-radius: 10px;
          background: ${lineColour};
        }

        body {
          margin: 0;
        }
        footer {
          position: absolute;
          width: 100%;
          height: 100px;
          bottom: 0;
          overflow: hidden;
        }

      `}</style>
    </div>
  );
};

export async function getServerSideProps(context) {
  const url = "http://worldtimeapi.org/api/timezone/Africa/Johannesburg";
  const result = await fetch(url);
  const timeData = await result.json();
  const lineId = context.query.id;

  if (tapiToken == null) {
    const token = await getTapiToken();
    tapiToken = token;
  } else {
    console.log("has valid token");
  }
  if (!dictionary[lineId]) {
    const line = await getTapiLine(lineId, tapiToken);
    dictionary[lineId] = line;
  } else {
    console.log("cache hit");
  }
  //const line = await getTapiLineName('T9htbUaZakysEKu4AXlQeg');
  const line = dictionary[lineId];

  return {
    props: { timeData: timeData, line: line }, // will be passed to the page component as props
  };
}

export default Line;
