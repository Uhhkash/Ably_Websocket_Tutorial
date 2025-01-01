import React, { useState } from 'react';
import { useChannel } from 'ably/react';
import ArticlePreview from './ArticlePreview';
import styles from '../styles/Home.module.css';

export default function Articles(props) {
  const [headlines, setHeadlines] = useState(props.history);
  const [eventTextBoxes, setEventTextBoxes] = useState([]); // Store text boxes created by "event-2"

  const { ably } = useChannel('headlines', (message) => {
    if (message.name === 'new-headline') {
      setHeadlines((prev) => [message, ...prev]);
    } else if (message.name === 'event-2') {
      // Add a new text box to the state
      setEventTextBoxes((prev) => [...prev, message.data.text]);
    }
  });

  const articles = headlines.map((headline, index) => (
    <ArticlePreview key={index} headline={headline} />
  ));

  const eventTextBoxElements = eventTextBoxes.map((text, index) => (
    <div key={index} className={styles.textBox}>
      {text}
    </div>
  ));

  return (
    <div>
      <div>{articles}</div>
      <div>{eventTextBoxElements}</div> {/* Render the "Event 2" text boxes */}
    </div>
  );
}
