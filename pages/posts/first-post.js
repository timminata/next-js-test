import {useEffect, useState} from 'react';
import Link from 'next/link'
import fetch from 'node-fetch'

const cache = {};

const FirstPost = (props) => {
    const data = props.data;
    //console.log(data);

    const [counter, setCounter] = useState(0);
    const [text, setText] = useState('');
    useEffect(() => {
        fetch('https://phoenix.whereismytransport.com/api/build').
            then(response => response.json()).
            then(data => {
                //console.log(data);
                setText(data.version);
            });
    },[])
    return (
        <>
    <h1>First post</h1>
    <p>This is the actual content of the post. It was a sunny day in Philadelphia.</p>
    <p>I don't know what happened next.</p>
    <p>I like to think it was exciting</p>
    <button onClick={() => setCounter(counter+1)}>Click me!</button>
    <p>I have been clicked {counter} times!</p>
    <p>Phoenix is on version {text}</p>
    <p>Phoenix name is {data.name}</p>
    <p>URL to fetch {props.url}</p>
    <p>Time now is {props.timeData.datetime}</p>
    <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>);
};

export async function getServerSideProps(context) {
  const url = 'http://worldtimeapi.org/api/timezone/Africa/Johannesburg';
  const result = await fetch(url);
  const timeData = await result.json();
  //const res = await fetch('https://phoenix.whereismytransport.com/api/build');
  //const data = await res.json();
  return {
    props: {data: {name: 'Pheono'}, timeData: timeData, url} // will be passed to the page component as props
  }
}

/*export async function getStaticProps(context) {
  const url = 'http://worldtimeapi.org/api/timezone/Africa/Johannesburg';
  const result = await fetch(url);
  const timeData = await result.json();
  //const res = await fetch('https://phoenix.whereismytransport.com/api/build');
  //const data = await res.json();
    return {
      props: {data: {name: 'Pheono'}, timeData: timeData, url} // will be passed to the page component as props
    }
  }*/

export default FirstPost;