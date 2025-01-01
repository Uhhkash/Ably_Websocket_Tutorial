import Head from 'next/head';
import Image from 'next/image';
import ablyLogo from '../public/ably-logo.svg';
import styles from '../styles/Home.module.css';
import Participants from '../components/Participants';
import Articles from '../components/Articles';
import { getHistoricalMessages } from '../lib/history';

export default function Home(props) {
  const handleEvent2Click = async () => {
    await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'event-2', text: 'This is a permanent text box for Event 2!' }),
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ably Realtime News Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://static.ably.dev/motif-red.svg?realtime-news" type="image/svg+xml" />
      </Head>

      <main className={styles.main}>
        <Image alt="ably logo" src={ablyLogo} width="160px" height="100%" />
        <h1>Chaos Engine</h1>
        <h3>Participants</h3>
        <Participants />
        <Articles history={props.history} />
      </main>

      <div className={styles.sidebar}>
        <button className={styles.button} onClick={handleEvent2Click}>
          Event 2
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages,
    },
    revalidate: 10,
  };
}
