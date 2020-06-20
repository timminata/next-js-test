import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react';

const LinesHome = (props) => {
    //const router = useRouter();
    const [text, setText] = useState('');
    return (
      <div className="container">
        <Head>
          <title>TAPI Lines</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Your one stop shop for transport data!"
          ></meta>
          <meta property="og:title" content="Transport data" />
          <meta
            property="og:url"
            content={`http://trewartha.za.net/lines`}
          />
          <meta property="og:description" content={`Transport lines searcher`}></meta>
          <meta
            property="og:image"
            content="https://pbs.twimg.com/profile_images/765843200691019776/WB3R_p3__400x400.jpg"
          ></meta>
        </Head>

        <h2>Search Transport</h2>

        <input value={text} onChange={e => setText(e.target.value)}></input>

  
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

          input {
              padding: 0.5em;
              border: 2px solid #70787B;
              font-size: larger;
              width: 25%;
          }
          
          .container {
            min-height: 85vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
    
    return {
      props: {  }, // will be passed to the page component as props
    };
  }
  
  export default LinesHome;