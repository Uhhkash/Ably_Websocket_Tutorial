import Head from 'next/head';
import Image from 'next/image';
import ablyLogo from '../public/ably-logo.svg';
import styles from '../styles/Home.module.css';
import Participants from '../components/Participants';
import Articles from '../components/Articles';
import { getHistoricalMessages } from '../lib/history';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ably Realtime News Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://static.ably.dev/motif-red.svg?realtime-news" type="image/svg+xml" />
      </Head>

      <main className={styles.main}>
        <Image alt="ably logo" src={ablyLogo} width="160px" height="100%"></Image>
        <h1>Realtime News</h1>
        <h2>Share your favorite news articles</h2>
        <h3>Participants</h3>
        <Participants />
        <Articles history={props.history} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages,
    },
    //enable ISR
    revalidate: 10,
  };
}