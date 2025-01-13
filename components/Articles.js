import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function Articles(props) {
  const [headlines, setHeadlines] = useState(props.history);

  useChannel('headlines', (headline) => {
    setHeadlines((prev) => [headline, ...prev]);
  });

  return (
    <div className={styles.articles}>
      {headlines.map((headline, index) => (
        <div key={index} className={styles.article}>
          <p>{headline.data.text}</p>
        </div>
      ))}
    </div>
  );
}